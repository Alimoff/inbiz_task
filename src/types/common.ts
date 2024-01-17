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

export enum Category {
    ELECTRONICS = 'electronics',
    CARS = 'cars',
    CLOTHES = 'clothes',
    FURNITURE_AND_DECOR = 'furniture_and_decor',
    HEALTH = 'health',
    COSMETICS = 'cosmetics',
    FOOD_AND_BEVERAGE = 'food_and_beverage',
    HOUSEHOLD_ITEMS = 'household_items',
    OFFICE_EQUIPMENT = 'office_equipment',
    OTHER = 'other',
}

export type Handler = (
    request:Request,
    response:Response,
    next:NextFunction
) => Promise<void>;