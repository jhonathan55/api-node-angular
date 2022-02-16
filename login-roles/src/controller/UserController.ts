import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";

export class UserController {
    //get all
    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        let users
        try {
             users = await userRepository.find(); 
        } catch (error) {
            res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(404).json({ message: 'not result' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const usersRepository = getRepository(User);
        try {
            const user = await usersRepository.findOneOrFail(id);
            res.send(user);
        } catch (error) {
            res.status(404).json({ message: 'not result' });

        }

    };

    static newUser = async (req: Request, res: Response) => {
        const { username, password, role } = req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;

        //validciones que el campo no este vacio
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user,validationOpt);

        if (errors.length > 0) {
            return res.status(400).json({message:'error en la validación de los datos'});
        }
        //todo hash password

        const userRepository = getRepository(User);
        try {
            //encripta el password
            user.hashPassword();
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({ message: 'username already exist' })
        }
        //all ok
        res.status(200).send('user created')
        
    };

    static editUser = async (req: Request, res: Response) => {
        let user;
        const { id } = req.params;
        const { username, role } = req.body;
        const userRepository = getRepository(User);
        try {
            user = await userRepository.findOneOrFail(id);
            user.username = username;
            user.role = role;
        } catch (error) {
            return res.status(404).json({ message: 'user not found' })
        }
        //valida que el rol no debe estar vacio
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(user, validationOpt);
        
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        //try to save
        try {
            await userRepository.save(user)
        } catch (error) {
            return res.status(409).json({ message: 'username already in use' })
        }
        res.status(204).json({ message: 'user update' })
    }

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        let user: User;
        try {
            user = await userRepository.findOneOrFail(id);

        } catch (error) {
            return res.status(404).json({ message: 'user not found' });

        }
        userRepository.delete(id);
        res.status(201).json({ message: 'user delete' })
    };

}
export default UserController;

