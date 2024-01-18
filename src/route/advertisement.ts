import { Router } from 'express'
import { AdvertisementController } from '../controller/advertisement';
import { authenticateUser } from '../middleware/authenticate';
import { uploadStorage } from '../middleware/multer';
import { createAdValidationSchema, updateAdValidationSchema } from '../validation/schemas/advertisement';
import {validate} from "../middleware/validate";

const advRouter = Router()
const controller = new AdvertisementController()

advRouter.get('/adv', controller.getAll, );
advRouter.get('/adv/:id', controller.getById);
advRouter.post('/adv', validate(createAdValidationSchema), uploadStorage.single('file'),authenticateUser,controller.create);
advRouter.put('/adv/:id', validate(updateAdValidationSchema), uploadStorage.single('file'),authenticateUser, controller.update);
advRouter.delete('/adv/:id',authenticateUser, controller.delete);

export { advRouter }