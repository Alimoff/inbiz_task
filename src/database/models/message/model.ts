import { model, Schema, SchemaTypes } from "mongoose";
import { IMessage} from "./types";

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

export const MessageModel = model("Message", messageSchema); 