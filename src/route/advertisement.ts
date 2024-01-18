import { Router } from 'express'
import { AdvertisementController } from '../controller/advertisement';
import {requireAdmin, validate} from "../middleware/validate";
import { authenticateUser } from '../middleware/authenticate';

const advRouter = Router()
const controller = new AdvertisementController()

advRouter.get('/adv', controller.getAll, );
advRouter.get('/adv/:id', controller.getById);
advRouter.post('/adv', authenticateUser,controller.create);
advRouter.put('/adv/:id', controller.update);
advRouter.delete('/adv/:id', controller.delete);

export { advRouter }