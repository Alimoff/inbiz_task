import { model, Schema, SchemaTypes } from 'mongoose';
import { IAdvertisement } from './types';
import { Category, Role } from '../../../types/common';

const AdvertisementSchema = new Schema<IAdvertisement>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category : {
    type: String,
    enum: [
         Category.CLOTHES,
              Category.COSMETICS,
                Category.ELECTRONICS,
                Category.FOOD_AND_BEVERAGE,
                Category.FURNITURE_AND_DECOR,
                Category.HEALTH,
                Category.HOUSEHOLD_ITEMS,
                Category.OFFICE_EQUIPMENT,
                Category.OTHER
    ]
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  publishedBy: {
    type: SchemaTypes.ObjectId,
    ref: "User",
  },
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: Date,
    required: true
  },
  archived: {
    type: Boolean,
    required: true,
  }
})

export const AdvertisementModel = model<IAdvertisement>('Advertisement', AdvertisementSchema);