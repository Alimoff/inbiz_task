import { Document, ObjectId } from "mongoose";
import { Role } from "../../../types/common";

export interface IAuth {
    _id: ObjectId | string;
    email:string;
    password:string;
    name:string;
    surname:string;
    role:Role
}

export type AuthDocument = Document & IAuth;