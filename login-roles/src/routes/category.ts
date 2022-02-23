import { Router } from "express";
import CategoryController from "../controller/CategoryController";

import { checkJwt } from "../middleware/jwt";

const router = Router();

//get all user
//checjJwt valida que el usuario este logeado o tenga un token valido
//checkRole valida que el rol admin pueda ejecutr cualquiera de endPoint
//ok
router.get('/', CategoryController.getAll);
//get one categrory ok
router.get('/:id', CategoryController.getById);
//create a new category ok
router.post('/' ,CategoryController.newCategory);
//edit category ok
router.patch('/:id', CategoryController.editCategory);
//delete category ok
router.delete('/:id', CategoryController.deleteCategory);

export default router;
