import { model, Schema, SchemaTypes } from 'mongoose';
import { IOffer } from './types';

const OfferSchema = new Schema<IOffer>({
  adId: {
    type: SchemaTypes.ObjectId,
    ref: "Advertisement",
    required:true,
  },
  userId: {
    type:SchemaTypes.ObjectId,
    ref: "User",
    required:true,
  },
  price: {
    type: Number,
    required:true,
  },
  description: {
    type:String,
  },
  date: {
    type: Date,
    default: Date.now(),
  }
});

export const OfferModel = model<IOffer>('Offer', OfferSchema);