import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export async function checkAuthorized(req:Request, res: Response){
            //To get accessToken if user is authorized
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                // Handle case where no access token is present
                return res.status(401).json({ error: 'Unauthorized - Missing token' });}

            const token = authorizationHeader.split(' ')[1];
              //Get user._id from accessToken
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { id: string };
            const publishedBy = decodedToken.id;

            return publishedBy;
}
