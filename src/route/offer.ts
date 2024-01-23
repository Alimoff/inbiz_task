import { Router } from 'express'
import { OfferController } from '../controller/offer';
import {RequireUserTypes, validate,validateIdParam} from "../middleware/validate";
import { createOfferValidationSchema, updateOfferValidationSchema } from '../validation/schemas/offer';

const offerRouter = Router();
const controller = new OfferController();
const userTypes = new RequireUserTypes();

offerRouter.get('/offer',userTypes.requireLegal, controller.getAll, );
offerRouter.get('/offer/:id',userTypes.requireLegal, controller.getById);
offerRouter.post('/offer',userTypes.requireIndividual, validate(createOfferValidationSchema), controller.create);
offerRouter.put('/offer/:id',userTypes.requireIndividual,validateIdParam, validate(updateOfferValidationSchema), controller.update);
offerRouter.delete('/offer/:id',userTypes.requireIndividual,validateIdParam, controller.delete);

export { offerRouter }