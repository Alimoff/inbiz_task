import { Router } from "express";
import { NotificationController } from "../controller/notification"
import { authenticateUser } from "../middleware/authenticate";

export const notificationRouter = Router();
const controller = new NotificationController();

notificationRouter.get("/notification",authenticateUser, controller.getNotifications);
notificationRouter.post("/notification",authenticateUser, controller.create);
