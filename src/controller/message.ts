import express, { Request, Response } from 'express';
import { MessageModel, MessageDocument } from '../database/models/message'
import jwt from 'jsonwebtoken';


export class MessageController {

public async createMessage(req: Request, res: Response) {
  try {
    const { to, content } = req.body;

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
    const newMessage =  new MessageModel({
      from:publishedBy,
      to,
      content,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

public async getMessages(req: Request, res: Response) {
    try {
      const { from, to } = req.params;

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
      const messages: MessageDocument[] = await MessageModel.find({
        $or: [
          { from:publishedBy, to },
          { from: to, to: from },
        ],
      }).sort({ createdAt: 'asc' });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

}