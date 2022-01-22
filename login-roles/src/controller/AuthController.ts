import { getRepository } from "typeorm";
import { Request, Response } from "express";
import {User} from '../entity/User';
import * as jwt from 'jsonwebtoken';
import config from "../config/config";
import { validate } from "class-validator";

class AuthController {
    
    static login = async (req:Request, res: Response)=>{
        const {username, password}=req.body;
        
        if(!(username && password)){
            return res.status(400).json({message:'Username & Password re required'}); 
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
           return res.status(400).json({message:'username or password incorect'});
        }
        //check password
        if(!user.checkPassword(password)){
            return res.status(400).json({message: "username or password incorrect"})
        }
        const token= jwt.sign({userId: user.id,username:user.username},config.jwtSecret,{expiresIn:'1h'})
        res.json({message:'ok',token})
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
}
export default AuthController;