import { Request, Response } from 'express';
import { NotificationModel } from '../database/models/notifcation'

export class NotificationController {
    public async getNotifications(req: Request, res: Response) {
    try {
        const userId = req.params.userId;
        const notifications = await NotificationModel.find({ userId, isRead: false });

        res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    };
}