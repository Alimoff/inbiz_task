import { Router } from "express";
import { MessageController } from "../controller/message";

export const messageRouter = Router();
const controller = new MessageController();

messageRouter.get("/message/:from/:to", controller.getMessages);
messageRouter.post("/message", controller.createMessage);