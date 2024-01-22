import { Router } from "express";
import { authenticateUser } from "../middleware/authenticate";
import { ChatController } from "../controller/chat";

export const chatRouter = Router();
const controller = new ChatController()

chatRouter.post('/chat', authenticateUser, controller.accessChats);
chatRouter.get('/', authenticateUser, controller.fetch);