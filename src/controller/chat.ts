import {Request, Response, NextFunction} from 'express';
import { ChatModel } from '../database/models/chat/model';
import { User } from '../database/models/auth';
import jwt from "jsonwebtoken";
import { StatusCodes } from 'http-status-codes';
import { checkAuthorized } from '../config/check_auth';

export class ChatController {

    //Method POST
    //To create a chat with one user
    public async accessChats (req: Request, res: Response, next: NextFunction){
        const {userId} = req.body;

        //Function to define user with their jwt access token ID
        const publishedBy = await checkAuthorized(req, res)

        if(!userId) res.send("Provide user's ID");
        let chatExists:any = await ChatModel.find({
            $and : [
                { users: {$elemMatch: { $eq: userId}}},
                {users: {$elemMatch: { $eq: publishedBy}}}
            ],
        })
        .populate('users', 'password')
        .populate('latestMessage');

        chatExists = await User.populate(chatExists, {
            path: 'latestMessage.sender',
            select: 'name email'
        });

        if(chatExists.length > 0){
            res.status(StatusCodes.OK).json({message: chatExists[0]});
        }else{
            let data = {
                chatName: 'sender',
                users: [userId, publishedBy]
            };
            try{
                const newChat = await ChatModel.create(data);
                const chat:any = (await ChatModel.find({ _id: newChat._id}))
                
                await chat.populate(
                    'users', 'password'
                );

                return res.status(StatusCodes.OK).json({message: chat});

            }catch(error){
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error});
            }
        }

    }

    //Method GET
    //To get all existing chats
    public async fetch(req: Request, res:Response, next: NextFunction){
        try{ 
            //Function to define user with their jwt access token ID
            const publishedBy = await checkAuthorized(req, res)

            const chats:any = await ChatModel.find({
                users: {$elemMatch: { $eq: publishedBy}},
            })
            .populate('users')
            .populate('latestMessage')
            .sort({ updatedAt: -1 });

            const finalChats:any =  await User.populate(chats,
                 {
                path: 'latestMessage.sender',
                select: 'name email',
            });

            return res.status(StatusCodes.OK).json({finalChats});

          }
          catch(error){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: error});
          }
    }
}