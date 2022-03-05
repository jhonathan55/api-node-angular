import { Router } from "express";

import ProductController from "../controller/ProductController";

import { checkJwt } from "../middleware/jwt";

const router = Router();

//get all user
//checjJwt valida que el usuario este logeado o tenga un token valido
//checkRole valida que el rol admin pueda ejecutr cualquiera de endPoint
//ok
router.get('/', ProductController.getAll);
//get one categrory ok
router.get('/:id', ProductController.getById);
//create a new category ok
router.post('/' ,ProductController.new);
//edit category ok
router.patch('/:id', ProductController.edit);
//delete category ok
router.delete('/:id', ProductController.delete);

export default router;
