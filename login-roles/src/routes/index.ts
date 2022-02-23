import { Router } from 'express';
import auth from './auth';
import category from './category';
import user from './user'

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/category', category);

export default routes;