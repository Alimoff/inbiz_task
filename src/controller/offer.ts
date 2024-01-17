import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import dotenv from 'dotenv';
import { OfferModel } from '../database/models/offer/model';

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
        const {adId,userId,price,description} = req.body;
        const date = Date.now();
    
        try{
            const newOffer = new OfferModel({ adId,userId, price, description, date});
            await newOffer.save();

            return res.status(StatusCodes.OK).json({message: newOffer});
        }catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: error});
        }
    }

    //Method PUT
    //To update an offer by ID
    public async update(req: Request, res: Response, next: NextFunction){
        const {userId, price, description,date} = req.body;
        const {id} = req.params;

        try{
            const updatedOffer = await OfferModel.findOneAndUpdate({_id:id},{
                userId, price, description, date
            });

            updatedOffer?.save();

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
