import { Request, Response } from 'express';
import { NotificationModel } from '../database/models/notifcation'
import jwt from 'jsonwebtoken';

export class NotificationController {
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
}