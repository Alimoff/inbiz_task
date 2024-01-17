import mongoose, {ObjectId, Document, Schema } from 'mongoose';

export interface INotification {
  _id: ObjectId | string;
  userId: ObjectId;
  message: string;
  isRead: boolean;
}

export type NotifcationDocument = Document & INotification;