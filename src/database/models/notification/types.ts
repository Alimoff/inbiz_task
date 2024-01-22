import mongoose, {ObjectId, Document, Schema } from 'mongoose';
import { AdvertisementDocument } from '../advertisement/types';

export interface INotification {
  _id: ObjectId | string;
  userId: ObjectId;
  advertiserId: ObjectId;
  message: string;
  advId:AdvertisementDocument;
  isRead: boolean;
}

export type NotifcationDocument = Document & INotification;