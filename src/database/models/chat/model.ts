import { model, Schema, SchemaTypes } from 'mongoose';
import { IChat } from './types';

const ChatSchema = new Schema<IChat>({

    chatName: {
        type: String,
    },
    users: [ {
        type: SchemaTypes.ObjectId,
        ref: "User",
    }],
    latestMessage: {
        type:SchemaTypes.ObjectId,
        ref: "Message"
    }
},
{
    timestamps: true
});

export const ChatModel = model<IChat>('Chat', ChatSchema);