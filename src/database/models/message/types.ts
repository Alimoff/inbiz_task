import { Document, ObjectId } from "mongoose";
import { ChatDocument } from "../chat/types";

export interface IMessage {
    _id: ObjectId | string;
    sender: ObjectId;
    message: string;
    chatId: ChatDocument;
}

export type MessageDocument = Document & IMessage;