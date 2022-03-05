import { Router } from 'express';

import auth from './auth';
import category from './category';
import product from './product';
import user from './user'

const routes = Router();

routes.use('/auth', auth);
routes.use('/user', user);
routes.use('/category', category);
routes.use('/product', product );
export default routes;