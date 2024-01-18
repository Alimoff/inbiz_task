import { Router } from 'express'
import { OfferController } from '../controller/offer';
import {requireAdmin, validate} from "../middleware/validate";
import { createOfferValidationSchema, updateOfferValidationSchema } from '../validation/schemas/offer';

const offerRouter = Router()
const controller = new OfferController()

offerRouter.get('/offer', controller.getAll, );
offerRouter.get('/offer/:id', controller.getById);
offerRouter.post('/offer', validate(createOfferValidationSchema), controller.create);
offerRouter.put('/offer/:id', validate(updateOfferValidationSchema), controller.update);
offerRouter.delete('/offer/:id', controller.delete);


export { offerRouter }