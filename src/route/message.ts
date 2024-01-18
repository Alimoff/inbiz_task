import { Router } from "express";
import { MessageController } from "../controller/message";
import { authenticateUser } from "../middleware/authenticate";

export const messageRouter = Router();
const controller = new MessageController();

messageRouter.get("/message/:from/:to",authenticateUser, controller.getMessages);
messageRouter.post("/message",authenticateUser, controller.createMessage);