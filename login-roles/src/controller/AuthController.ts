import { getRepository } from "typeorm";
import { Request, Response } from "express";
import {User} from '../entity/User';


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
        res.send(user);
    }
    
}
export default AuthController;