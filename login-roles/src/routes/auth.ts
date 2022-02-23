import { Router } from "express";
import  AuthController  from '../controller/AuthController'
import { checkJwt } from "../middleware/jwt";

const router = Router();

router.post('/login', AuthController.login);
//cambio de contraseña usuarios envio de link
router.put('/forgot-password', AuthController.forgotPassword);
//cambio de contraseña 
router.put('/new-password', AuthController.newPassword);
//change Password admin
router.post('/change-password',[checkJwt], AuthController.changePassword);

export default router;