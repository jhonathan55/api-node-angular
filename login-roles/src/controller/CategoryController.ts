import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import {Category} from "../entity/Category"

export class CategoryController{

    static getAll = async(req:Request, res:Response)=>{
        const userRepository = getRepository(Category);
        let categorys
        try {
            categorys = await userRepository.find(); 
        } catch (error) {
            res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
    
        if (categorys.length > 0) {
            res.send(categorys);
        } else {
            res.status(404).json({ message: 'not result' });
        }
    }
    static getById = async(req:Request, res:Response)=>{
        const { id } = req.params;
        const usersRepository = getRepository(Category);
        try {
            const user = await usersRepository.findOneOrFail(id);
            res.send(user);
        } catch (error) {
            res.status(404).json({ message: 'not result' });

        }  
    }
    static newCategory = async(req:Request, res:Response)=>{
        const { name, description } = req.body;
        const category = new Category();

        category.name = name;
        category.description = description;
        

        //validciones que el campo no este vacio
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(category,validationOpt);

        if (errors.length > 0) {
            return res.status(400).json({message:'error en la validación de los datos'});
        }
        //todo hash password

        const userRepository = getRepository(Category);
        try {
           
            await userRepository.save(category);
        } catch (error) {
            return res.status(409).json({ message: 'username already exist' })
        }
        //all ok
        res.status(200).send('user created') 
    }
    static editCategory = async(req:Request, res:Response)=>{
        let category;
        const { id } = req.params;
        const { name, description } = req.body;
        const userRepository = getRepository(Category);
        try {
            category = await userRepository.findOneOrFail(id);
            category.name = name;
            category.description = description;
        } catch (error) {
            return res.status(404).json({ message: 'user not found' })
        }
        //valida que el rol no debe estar vacio
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(category, validationOpt);
        
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        //try to save
        try {
            await userRepository.save(category)
        } catch (error) {
            return res.status(409).json({ message: 'username already in use' })
        }
        res.status(204).json({ message: 'user update' })
    }
    static deleteCategory = async(req:Request, res:Response)=>{
        const { id } = req.params;
        const userRepository = getRepository(Category);
        let category: Category;
        try {
            category = await userRepository.findOneOrFail(id);

        } catch (error) {
            return res.status(404).json({ message: 'user not found' });

        }
        userRepository.delete(id);
        res.status(201).json({ message: 'user delete' }) 
    }
}

export default CategoryController;