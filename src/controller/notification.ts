import { NextFunction, Request, Response } from 'express';
import { NotificationModel } from '../database/models/notification'
import jwt from 'jsonwebtoken';
import { AdvertisementModel } from '../database/models/advertisement/model';
import { checkAuthorized } from '../config/check_auth';

export class NotificationController {
    //Method GET
    //To receive notification
    public async getNotifications(req: Request, res: Response) {
    try {

        //Function to define user with their jwt access token ID
        const publishedBy = await checkAuthorized(req, res)

        const notifications = await NotificationModel.find({ userId:publishedBy, isRead: false });

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    };

    public async create(req: Request, res: Response, next: NextFunction){
            //Function to define user with their jwt access token ID
            const publishedBy = await checkAuthorized(req, res)

         try{
            const {message} = req.body;
            const {advId} = req.params;

            const advertisement = await AdvertisementModel.findById(advId).populate('user')
            if(advertisement){
                const advertiserId = advertisement.publishedBy;

                await NotificationModel.create({
                    userId:publishedBy, advertiserId,message, advId
                })
            }
         }catch(error){
            res.status(500).json({ message: error });
         }
    }
}