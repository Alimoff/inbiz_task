import { NextFunction } from "express";

export enum Status {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    PENDING = 'pending'
}

export enum Role {
    LEGAL = 'legal',
    INDIVIDUAL = 'individual',
    ADMIN = 'admin',
    SUPERADMIN = 'superadmin',
}

export type Handler = (
    request:Request,
    response:Response,
    next:NextFunction
) => Promise<void>;