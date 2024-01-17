import { model, Schema, SchemaTypes } from "mongoose";
import { INotification} from "./types";

const notificationSchema = new Schema<INotification>({
   userId: {
    type: SchemaTypes.ObjectId, 
    ref: "User",
    required: true,
   },
   message: {
    type: String,
    required: true,
   },
   isRead: {
    type: Boolean, 
    default: false,
   }
});

export const NotificationModel = model("Notification", notificationSchema); 