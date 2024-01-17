import { Document, ObjectId } from "mongoose";
import { Role } from "../../../types/common";

export interface IOffer {
    _id: ObjectId | string;
    adId: ObjectId | string;
    userId: ObjectId | string;
    price: number;
    description?: string;
    date:Date
}

export type OfferDocument = Document & IOffer;