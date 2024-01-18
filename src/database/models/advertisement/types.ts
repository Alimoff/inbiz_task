import { Document, ObjectId } from "mongoose";
import { Role } from "../../../types/common";
import { CategoryDocument } from '../category';
import { AuthDocument } from "../auth";

export interface IAdvertisement {
    _id: ObjectId | string;
    title?: string;
    description? : string;
    category: CategoryDocument;
    price?: number;
    file?: string;
    publishedBy?: AuthDocument;
    publishedDate: Date;
    duration?: number;
    expirationDate?: Date;
    archived: Boolean;
}

export type AdvertisementDocument = Document & IAdvertisement;