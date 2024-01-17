import { Router } from 'express'
import { OfferController } from '../controller/offer';
import {requireAdmin, validate} from "../middleware/validate";

const offerRouter = Router()
const controller = new OfferController()

offerRouter.get('/offer', controller.getAll, );
offerRouter.get('/offer/:id', controller.getById);
offerRouter.post('/offer', controller.create);
offerRouter.put('/offer/:id', controller.update);
offerRouter.delete('/offer/:id', controller.delete);


export { offerRouter }