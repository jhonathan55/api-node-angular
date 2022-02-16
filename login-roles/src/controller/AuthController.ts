import { getRepository } from "typeorm";
import { Request, Response } from "express";
import {User} from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import { validate } from "class-validator";
import { transporter } from "../config/mailer";
class AuthController {
    
    static login = async (req:Request, res: Response)=>{
        const {username, password}=req.body;
        
        if(!(username && password)){
            return res.status(400).json({message:'Username & Password are required'}); 
        }
        const userRopository = getRepository(User);
        let user:User;
        try {
            user=await userRopository.findOneOrFail({
                where:{
                    username
                }
            });
        } catch (error) {
           return res.status(452).json({message:'username incorect'});
        }
        //check password
        if(!user.checkPassword(password)){
            return res.status(452).json({message: "password incorrect"})
        }

        const token= jwt.sign({userId: user.id,username:user.username},config.jwtSecret,{expiresIn:'1h'})
        //enviamos al front el mensaje, token y rol desde la res user
        res.json({message:'ok',token,role:user.role, id:user.id})
    }
    static changePassword = async (req:Request, res:Response) =>{
        const {userId}= res.locals.jwtPayload;
        const {oldPassword, newPassword}= req.body;
        if(!(oldPassword && newPassword)){
            res.status(400).json({message:'oldPassword && new Pasword are require'})
        }
        const userRopository= getRepository(User);
        let user:User;
        try {
            user =await userRopository.findOneOrFail(userId);
        } catch (error) {
            res.status(400).json({message: 'somenthing goes wrong'});
        }
        if(!user.checkPassword(oldPassword)){
            return res.status(401).json({message:'check your old password'});
        }
        user.password = newPassword;
        const validateOpt={validationError:{targer:false,value:false}};
        const errors= await validate(user,validateOpt);
        if(errors.length>0){
            return res.status(400).json(errors);
        }
        //hasPassword
        user.hashPassword();
        userRopository.save(user);
        res.json({message:'Password update'})
    }

    static forgotPassword= async(req:Request, res: Response)=>{
        //en la constante recibimos el username desde el frontend mediante el metodo req
        const {username}= req.body;
        //validamos que exista un username y si no se encuentra enviamos un status y mensaje
        if(!(username)){
            return res.status(400).json({message:'username required'})
        }
        //variables de respuesta
        let messaege='check your email for a link to reset you password';
        let verificacionLink;
        let emailStatus='OK';
        
        const userRepository= getRepository(User);
        let user:User;
        //buscamos en nuestar BBDD el usuario
        try {
            user= await userRepository.findOneOrFail({
                where: {
                    username
                }
            })
            //si encontramos un usuario creamos un nuevo token
            const token = jwt.sign({userId:user.id, username:user.username}, config.jwtSecretReset,{expiresIn: '20m'});
            //guarda el link con el token
            verificacionLink= `http://localhost:3000/new-password/${token}`;
            //guarda el token
            user.resetToken= token;

        } catch (error) {
            //si no encuentra el username devuelve un message 
            messaege= 'Username not found';
            return res.status(400).json(messaege)
        }
        //todo send email
        try {
            await transporter.sendMail({
                from: '"Fred Foo 👻" <foo@example.com>', // sender address
                to: user.username, // list of receivers
                subject: "Change password ✔", // Subject line
                text: "Change password", // plain text body
                html: `
                    <p>Change password</p>
                    <a href="${verificacionLink}">${verificacionLink}</a>                
                `, // html body
              });


        } catch (error) {
          emailStatus= error;
          return res.status(400).json({messaege:'no se puedo enviar email'})  
        }
        //
        try {
            await userRepository.save(user);
        } catch (error) {
            messaege= 'someting  goes wrong'
            emailStatus= error
            return res.status(400).json({})
        }
        res.json({messaege, info:emailStatus, test:verificacionLink})

    };

    static newPassword = async(req:Request, res:Response)=>{
        const {newPassword}= req.body;
        //recuperamos desde el header la propiedad reset (token) para validar el change of the password
        const resetToken = req.headers.reset as string;
        if(!(newPassword)){
            res.status(400).json({message:'all the  fields are required'})
        }
        const userRepository= getRepository(User);
        let jwtPayload;
        let user:User;
        try {
            jwtPayload = jwt.verify(resetToken, config.jwtSecretReset);
            user= await userRepository.findOneOrFail({where:{resetToken}});
        } catch (error) {
            return res.status(401).json({message:'someting goes wrog'})
        }
        user.password= newPassword;
        //validamos que los campos no esten vacios
        const validateOpt= {validationError: {target:false,value:false}};
        const errors = await validate(user,validateOpt);
        if(errors.length>0){
            return res.status(400).json({errors})
        }
        try {
            user.hashPassword();
            await userRepository.save(user)
        } catch (error) {
            return res.status(401).json({message:'algo a ido mal'})
        }

        res.json({message:'Passwrd change'})
    }


}
export default AuthController;