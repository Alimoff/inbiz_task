import createHttpError from "http-errors";
import { Request, Response, NextFunction } from "express";
import { getStatusText, StatusCodes } from "http-status-codes";
import { ValidationError, ObjectSchema } from "yup";
import { changeResponse } from "./../utils/changeResponse";
import { objectIdRegex } from "./../constant/regex";
import *  as jwt from "../config/jwt";
import dotenv from "dotenv";
dotenv.config();

export const validate =
  // @ts-ignore
    (schema: ObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await schema.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });
        next();
      } catch (e) {
        const errors: any = (e as ValidationError).inner.reduce(
          // @ts-ignore
          (errors, current) => ({ ...errors, [current.path]: current.errors }),
          {}
        );

        res.status(StatusCodes.BAD_REQUEST).json(
          changeResponse(false, null, {
            code: StatusCodes.BAD_REQUEST,
            error: true,
            message: getStatusText(StatusCodes.BAD_REQUEST),
            payload: errors.payload || errors.data || errors,
          })
        );
      }
    };

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!id.match(objectIdRegex)) {
    throw createHttpError(
      StatusCodes.NOT_FOUND,
      getStatusText(StatusCodes.NOT_FOUND)
    );
  }
  next();
};

// Middleware to check if the user is a superadmin
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  try {

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Missing token' });
            }
      const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

      if (!decodedToken || typeof decodedToken !== 'object' || !('role' in decodedToken)) {
          // Additional check to handle potential issues with jwt.verify
          return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }

      // Type assertion to inform TypeScript about the type of decodedToken
      const userRole = (decodedToken as { role: string }).role;

      if (userRole !== 'ADMIN') {
          return res.status(403).json({ error: 'Forbidden - Insufficient privileges' });
      }

      // User is a superadmin, proceed to the next middleware or route handler
      next();
  } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};




export const requireIndividual = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
      const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!decodedToken || typeof decodedToken !== 'object' || !('role' in decodedToken)) {
          // Additional check to handle potential issues with jwt.verify
          return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }

      // Type assertion to inform TypeScript about the type of decodedToken
      const userRole = (decodedToken as { role: string }).role;

      if (userRole !== 'INDIVIDUAL') {
          return res.status(403).json({ error: 'Forbidden - Insufficient privileges' });
      }

      // User is an individual, proceed to the next middleware or route handler
      next();
  } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};


export const requireLegal = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
      return res.status(401).json({ error: 'Unauthorized - Missing token' });
  }

  try {
      const decodedToken: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      if (!decodedToken || typeof decodedToken !== 'object' || !('role' in decodedToken)) {
          // Additional check to handle potential issues with jwt.verify
          return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }

      // Type assertion to inform TypeScript about the type of decodedToken
      const userRole = (decodedToken as { role: string }).role;

      if (userRole !== 'LEGAL') {
          return res.status(403).json({ error: 'Forbidden - Insufficient privileges' });
      }

      // User is a legal, proceed to the next middleware or route handler
      next();
  } catch (error) {
      console.error(error);
      return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};