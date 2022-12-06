import { Router } from "express";
import { UserController } from "../controller/UserController";
import { checkJwt } from "../middleware/jwt";
import { checkRole } from "../middleware/role";
const router = Router();

//get all user
//checjJwt valida que el usuario este logeado o tengo un token valido
//checkRole valida que el rol admin pueda ejecutr cualquiera de endPoint
router.get('/', UserController.getAll);
//get one user
router.get('/:id', [checkJwt], UserController.getById);
//create a new user
router.post('/',UserController.newUser);
//edit user
router.patch('/:id', [checkJwt, checkRole(['admin'])], UserController.editUser);
//delete user
router.delete('/:id', [checkJwt], UserController.deleteUser);

export default router;
