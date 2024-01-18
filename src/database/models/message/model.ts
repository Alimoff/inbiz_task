import { model, Schema, SchemaTypes } from "mongoose";
import { IMessage, MessageDocument} from "./types";
import { NotificationModel } from "../notifcation"

const messageSchema = new Schema<IMessage>({
    from :{
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true,
    }

});

messageSchema.post<MessageDocument>('save', async function(doc){
    await NotificationModel.create({
        userId: doc.to,
        message: `You have a message from ${doc.from}`,
    });
})
 
export const MessageModel = model("Message", messageSchema); 