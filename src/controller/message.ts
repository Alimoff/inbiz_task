import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {MessageModel,MessageDocument} from "../database/models/message";
import jwt from "jsonwebtoken";
import { ChatModel } from "../database/models/chat/model";
import { nextTick } from "process";

export class MessageController {
    //Method GET
    // To get all message from specific user
    public async createMessage(req: Request, res: Response) {
        try {
          const { chatId, message } = req.body;
      
            //To get accessToken if user is authorized
            const authorizationHeader = req.headers.authorization;
      
            if (!authorizationHeader) {
                // Handle case where no access token is present
                return res.status(401).json({ error: 'Unauthorized - Missing token' });}
      
            const token = authorizationHeader.split(' ')[1];
              //Get user._id from accessToken
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };
            const publishedBy = decodedToken.id;
          // Assuming from and to are valid user IDs
          const newMessage = await MessageModel.create({chatId, message, sender:publishedBy})
          
          await newMessage
          .populate({
            path: 'chatId',
            select: 'chatName users',
            model: 'Chat',
            populate: {
              path: 'users',
              select: 'name email',
              model: 'User',
            }
        });
        await ChatModel.findByIdAndUpdate(chatId, {
            latestMessage:newMessage
        });
      
          res.status(201).json(newMessage);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      };

    //Method POST
    //To write message to specific user
public async getMessages(req: Request, res: Response) {
    try {
      const { chatId } = req.params;

          //To get accessToken if user is authorized
          const authorizationHeader = req.headers.authorization;

          if (!authorizationHeader) {
          // Handle case where no access token is present
            return res.status(401).json({ error: 'Unauthorized - Missing token' });}
      
          const token = authorizationHeader.split(' ')[1];
          //Get user._id from accessToken
          const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };
          const publishedBy = decodedToken.id;
  
      // Assuming from and to are valid user IDs
      const messages = await MessageModel.find({
        chatId
      })
      .populate({
        path: 'sender',
        model: 'User',
        select: 'name email',
      })
      .populate({
        path: 'chatId',
        model: 'Chat',
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}