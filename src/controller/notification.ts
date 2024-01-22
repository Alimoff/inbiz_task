import { NextFunction, Request, Response } from 'express';
import { NotificationModel } from '../database/models/notification'
import jwt from 'jsonwebtoken';
import { AdvertisementModel } from '../database/models/advertisement/model';

export class NotificationController {
    //Method GET
    //To receive notification
    public async getNotifications(req: Request, res: Response) {
    try {

        //To get accessToken if user is authorized
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            // Handle case where no access token is present
            return res.status(401).json({ error: 'Unauthorized - Missing token' });}
        
        const token = authorizationHeader.split(' ')[1];
        //Get user._id from accessToken
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };
        const publishedBy = decodedToken.id;

        const notifications = await NotificationModel.find({ userId:publishedBy, isRead: false });

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    };

    public async create(req: Request, res: Response, next: NextFunction){
         //To get accessToken if user is authorized
         const authorizationHeader = req.headers.authorization;

         if (!authorizationHeader) {
             // Handle case where no access token is present
             return res.status(401).json({ error: 'Unauthorized - Missing token' });}
         
         const token = authorizationHeader.split(' ')[1];
         //Get user._id from accessToken
         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };
         const publishedBy = decodedToken.id;

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