import { Document, ObjectId } from "mongoose";
import { Role } from "../../../types/common";

export interface IAuth extends Document {
    _id: ObjectId | string;
    email: string;
    password: string;
    name: string;
    surname: string;
    role: Role;
    notifications: ObjectId[];
  }
export type AuthDocument = Document & IAuth;