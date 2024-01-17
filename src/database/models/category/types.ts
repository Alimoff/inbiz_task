import { Document,ObjectId } from "mongoose";
import { Category} from "../../../types/common";

export interface ICategory {
    _id: ObjectId | string;
    name:Category;
    description?: string;
}

export type CategoryDocument = Document & ICategory;