import express, { Request, Response } from 'express';
import { MessageModel, MessageDocument } from '../database/models/message'



export class MessageController {

public async createMessage(req: Request, res: Response) {
  try {
    const { from, to, content } = req.body;

    // Assuming from and to are valid user IDs
    const newMessage =  new MessageModel({
      from,
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
  
      // Assuming from and to are valid user IDs
      const messages: MessageDocument[] = await MessageModel.find({
        $or: [
          { from, to },
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