import { model, Schema, SchemaTypes } from 'mongoose';
import { IMessage } from './types';

const MessageSchema = new Schema<IMessage>({

    sender: {
        type: SchemaTypes.ObjectId,
        ref: "User",
    },
    message: {
        type: String,
        trim: true,
    },
    chatId:  {
        type:SchemaTypes.ObjectId,
        ref: "Chat"
    },
},
{
    timestamps: true
});

export const MessageModel = model<IMessage>('Message', MessageSchema);