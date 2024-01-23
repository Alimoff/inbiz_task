import { Router } from 'express'
import { AdvertisementController } from '../controller/advertisement';
import { authenticateUser } from '../middleware/authenticate';
import { uploadStorage } from '../middleware/multer';
import { createAdValidationSchema, updateAdValidationSchema } from '../validation/schemas/advertisement';
import {validate,validateIdParam} from "../middleware/validate";
import {RequireUserTypes} from "../middleware/validate"

const advRouter = Router()
const controller = new AdvertisementController()
const reqUsers = new RequireUserTypes();

advRouter.get('/adv', controller.getAll, );
advRouter.get('/adv/:id',validateIdParam, controller.getById);
advRouter.post('/adv',reqUsers.requireLegal,authenticateUser, 
    validate(createAdValidationSchema), uploadStorage.single('file'),
    authenticateUser,controller.create);
advRouter.put('/adv/:id', validateIdParam,reqUsers.requireLegal,
    authenticateUser, validate(updateAdValidationSchema),
    uploadStorage.single('file'),authenticateUser, controller.update);
advRouter.delete('/adv/:id',validateIdParam,reqUsers.requireLegal, authenticateUser, controller.delete);

export { advRouter }