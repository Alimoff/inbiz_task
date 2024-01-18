import { Router } from 'express'
import { AdvertisementController } from '../controller/advertisement';
import { authenticateUser } from '../middleware/authenticate';
import { uploadStorage } from '../middleware/multer';

const advRouter = Router()
const controller = new AdvertisementController()

advRouter.get('/adv', controller.getAll, );
advRouter.get('/adv/:id', controller.getById);
advRouter.post('/adv', uploadStorage.single('file'),authenticateUser,controller.create);
advRouter.put('/adv/:id',uploadStorage.single('file'),authenticateUser, controller.update);
advRouter.delete('/adv/:id',authenticateUser, controller.delete);

export { advRouter }