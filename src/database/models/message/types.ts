import mongoose, {ObjectId, Document, Schema } from 'mongoose';


export interface IMessage {
  _id: ObjectId | string;
  from: ObjectId;
  to: ObjectId;
  content: string;
}