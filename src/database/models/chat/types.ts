import { Document, ObjectId } from "mongoose";
import {SchemaTypes} from "mongoose"

export interface IChat {
    _id: ObjectId | string;
    chatName: string;
    users: [ObjectId];
    latestMessage: ObjectId;
}

export type ChatDocument = Document & IChat;