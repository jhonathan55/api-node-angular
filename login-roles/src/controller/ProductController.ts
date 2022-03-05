import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { validate } from "class-validator";
import { Category } from "../entity/Category"
import { Product } from "../entity/Product";

export class ProductController {
    //ok
    static getAll = async (req: Request, res: Response) => {
        const productRepository = getRepository(Product);
        let prodByCategoty
        try {
            //busca todos los productos y sus categories
            prodByCategoty = await productRepository.find({ relations: ['categories'] });
        } catch (error) {
            res.status(404).json({ message: 'Somenthing goes wrong!' });
        }

        if (prodByCategoty.length > 0) {
            res.send(prodByCategoty);
        } else {
            res.status(404).json({ message: 'not result' });
        }
    }
    //ok
    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const productRepository = getRepository(Product);
        try {
            const user = await productRepository.findOneOrFail(id, { relations: ['categories'] });
            res.send(user);
        } catch (error) {
            res.status(404).json({ message: 'not result' });

        }
    }
    //ok save product and category
    static new = async (req: Request, res: Response) => {
        const { name, description, price, categories } = req.body;
        //instanciamos nuestro product
        const product = new Product();
        //traemos table category
        const categoryRepo = getRepository(Category);
        //shear in table category by Ids
        const categoryId = await categoryRepo.findByIds(categories);
        product.name = name;
        product.description = description;
        product.price = price;
        //pasamos la busqueda para ser insertada in table produc & products by category
        product.categories = categoryId;


        //validciones que el campo no este vacio
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(product, validationOpt);

        if (errors.length > 0) {
            return res.status(400).json({ message: 'error en la validación de los datos' });
        }
        //todo hash password

        const userRepository = getRepository(Product);
        try {

            await userRepository.save(product);
        } catch (error) {
            return res.status(409).json({ message: 'product already exist' })
        }
        //all ok
        res.status(200).send('product created')
    }
    //ok
    static edit = async (req: Request, res: Response) => {
        let product;
        const { id } = req.params;
        const { name, description, categories } = req.body;
        const productRepository = getRepository(Product);
        //traemos table category
        const categoryRepo = getRepository(Category);
        try {
            product = await productRepository.findOneOrFail(id);
            //shear in table category by Ids
            const categoryId = await categoryRepo.findByIds(categories);
            product.name = name;
            product.description = description;
            //pasamos la busqueda para ser insertada in table produc & products by category
            product.categories = categoryId;
        } catch (error) {
            return res.status(404).json({ message: 'user not found' })
        }
        //valida los campos vacios de la instancia product
        const validationOpt = { validationError: { target: false, value: false } };
        const errors = await validate(product, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }
        //try to save
        try {
            await productRepository.save(product)
        } catch (error) {
            return res.status(409).json({ message: 'product already in use' })
        }
        res.status(204).json({ message: 'product update' })
    }
    //Ok
    static delete = async (req: Request, res: Response) => {
        const { id } = req.params;
        const productRepository = getRepository(Product);
        let product: Product;
        try {
            product = await productRepository.findOneOrFail(id);

        } catch (error) {
            return res.status(404).json({ message: 'user not found' });

        }
        productRepository.delete(id);
        res.status(201).json({ message: 'user delete' })
    }
}

export default ProductController;