import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import { OfferModel } from '../database/models/offer/model';
import jwt from 'jsonwebtoken';
import { AdvertisementModel } from '../database/models/advertisement/model';
import { NotificationModel } from '../database/models/notification';
import { checkAuthorized } from '../config/check_auth';

dotenv.config();


export class OfferController {

    //Method GET 
    //To show all offers
    public async getAll(req:Request, res:Response, next:NextFunction){
        try{
  
            const offers = await OfferModel.find();

            return res.status(StatusCodes.OK).json({message: offers})
        }
        catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message : error});
        }
    }

     //Method GET 
    //To show an offer by ID
    public async getById(req:Request, res:Response, next:NextFunction){
        try{
            const {id} = req.params;

            const adv= await OfferModel.findById({_id: id});

            return res.status(StatusCodes.OK).json({message: adv})
        }
        catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message : error});
        }
    }

    //Method POST 
    // To create new offer
    public async create(req: Request, res: Response, next: NextFunction){
        const {adId,price,description} = req.body;
    
        try{
            //Function to define user with their jwt access token ID
            const publishedBy = await checkAuthorized(req, res)

          
            const newOffer = new OfferModel({ adId,userId:publishedBy, price, description});
            await newOffer.save();

            const adv = await AdvertisementModel.findById(adId);
            if(adv){
                const advertiser = adv.publishedBy;

                 await NotificationModel.create({
                    userId:publishedBy, advertiserId:advertiser,message:description,advId:adId
                });
            }

            return res.status(StatusCodes.OK).json({newOffer});
        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: error});
        }
    }

    //Method PUT
    //To update an offer by ID
    public async update(req: Request, res: Response, next: NextFunction){
        const { price, description,date} = req.body;
        const {id} = req.params;

        //Function to define user with their jwt access token ID
        const publishedBy = await checkAuthorized(req, res)

        try{
            const updatedOffer = await OfferModel.findOneAndUpdate({_id:id},{
             price, description, date,userId:publishedBy
            });

            await updatedOffer?.save();

            return res.status(StatusCodes.OK).json({message: updatedOffer});

        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: error});
        }
    }  

    //Method DELETE
    //To delete an advertisement by ID
    public async delete(req:Request, res:Response, next:NextFunction){
        const {id} = req.params;
        try{
            const deleteOffer = await OfferModel.findOneAndDelete({_id:id});
            deleteOffer?.save();
            res.status(StatusCodes.OK).json({message: "Advertisement deleted successfully!"});
        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: error});
        }
    }
}
