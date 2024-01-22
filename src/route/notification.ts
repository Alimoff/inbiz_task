import { Router } from "express";
import { NotificationController } from "../controller/notification"

export const notificationRouter = Router();
const controller = new NotificationController();

notificationRouter.get("/notification", controller.getNotifications);
