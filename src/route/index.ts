import {Router} from 'express';
import { authRouter } from './auth';
import { advRouter } from './advertisement';
import {categoryRouter} from './category';
import { offerRouter } from './offer';

export const router = Router();

router.use("/api", authRouter);
router.use('/api', advRouter);
router.use('/api',categoryRouter);
router.use('/api',offerRouter);