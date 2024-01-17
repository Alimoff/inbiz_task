import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AdvertisementModel } from '../database/models/advertisement/model';
import { Category } from '../types/common';
import dotenv from 'dotenv';
import { autoDeleteExpiredAds } from '../middleware/autoDelete';
import jwt, { decode } from 'jsonwebtoken';

dotenv.config()

export class AdvertisementController {

    //Method GET 
    //To show all published advertisements
    public async getAll(req:Request, res:Response, next:NextFunction){
        try{
            //To hide expired advs
            await autoDeleteExpiredAds();

            const advs = await AdvertisementModel.find({archived: {$ne: true}});

            return res.status(StatusCodes.OK).json({message: advs})
        }
        catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message : error});
        }
    }

     //Method GET 
    //To show a published advertisements by ID
    public async getById(req:Request, res:Response, next:NextFunction){
        try{
            const {id} = req.params;

            //To hide expired ads
            await autoDeleteExpiredAds();

            const adv = await AdvertisementModel.findById({_id: id},{archived: {$ne: true}});

            return res.status(StatusCodes.OK).json({message: adv})
        }
        catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message : error});
        }
    }

    //Method POST 
    // To create new advertisement
    public async create(req: Request, res: Response, next: NextFunction){
        try{
            const {title, description, category,price, image,duration} = req.body;
            const publishedDate = Date.now();
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + duration);
            
            const jwtSecret: any = process.env.ACCESS_TOKEN_SECRET;
    
            //To get accessToken if user is authorized
            const authorizationHeader = req.headers.authorization;

    
            if (!authorizationHeader) {
                // Handle case where no access token is present
                return res.status(401).json({ error: 'Unauthorized - Missing token' });
              }
    
            const token = authorizationHeader.split(' ')[1];

              //Get user._id from accessToken
            const decodedToken = jwt.verify(token, jwtSecret) as { _id: string };

            const publishedBy = decodedToken._id;


            const newAdvertisement = new AdvertisementModel({
                title, description, category, price, image,duration,publishedDate,expirationDate, archived:false,publishedBy
            });
            await newAdvertisement.save();

            return res.status(StatusCodes.OK).json({message: newAdvertisement});
        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: error});
        }
    }

    //Method PUT
    //To update an advertisement by ID
    public async update(req: Request, res: Response, next: NextFunction){
        const {title, description, category,price, image,publishedBy} = req.body;
        const {id} = req.params;

        try{
            const updatedAdvertisement = await AdvertisementModel.findOneAndUpdate({_id:id},{
                title, description, category, price, image, publishedBy: req.user
            });

            if (![Category.CARS, Category.CLOTHES, Category.COSMETICS, Category.ELECTRONICS, Category.FOOD_AND_BEVERAGE,
                Category.FURNITURE_AND_DECOR, Category.HEALTH, Category.HOUSEHOLD_ITEMS, Category.OFFICE_EQUIPMENT, Category.OTHER].includes(category)){
                    return res.status(StatusCodes.BAD_REQUEST).json({error: `There is no ${category} category`});
                  }

            updatedAdvertisement?.save();

            return res.status(StatusCodes.OK).json({message: updatedAdvertisement});

        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: error});
        }
    }  

    //Method DELETE
    //To delete an advertisement by ID
    public async delete(req:Request, res:Response, next:NextFunction){
        const {id} = req.params;
        try{
            const deleteAdvertisement = await AdvertisementModel.findOneAndDelete({_id:id});
            deleteAdvertisement?.save();
            res.status(StatusCodes.OK).json({message: "Advertisement deleted successfully!"});
        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: error});
        }
    }
}
