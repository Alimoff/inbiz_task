import { NextFunction, Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import { CategoryModel } from "../database/models/category";

export class CategoryController {
    //METHOD POST
    //Create category
    public async create (req:Request, res: Response, next: NextFunction){
        try{
        const { name, description} = req.body;

        const isExist = await CategoryModel.findOne({name});

        // if ([Category.CARS, Category.CLOTHES, Category.COSMETICS, Category.ELECTRONICS, Category.FOOD_AND_BEVERAGE,
        // Category.FURNITURE_AND_DECOR, Category.HEALTH, Category.HOUSEHOLD_ITEMS, Category.OFFICE_EQUIPMENT, Category.OTHER].includes(name)){
        //     return res.status(StatusCodes.BAD_REQUEST).json({error: `Category ${name} already exists`});
        //   }

        if (isExist){
            res.status(StatusCodes.BAD_REQUEST).json({message: "Category already exists"}); 
        }else{

        const newCategory:any = new CategoryModel({
           name, description});

        await newCategory.save();
        }
        return res.status(StatusCodes.OK).json({message: "Category successfully created!"});
        }
        catch(message){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message})
        }

    } 


    //METHOD PUT
    //Update a category
    public async update (req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params;
            const { name, description } = req.body;

            if(!name){
                res.status(StatusCodes.NOT_FOUND).json({message: "Category is not found!"});
            }

            const category: any = await CategoryModel.findOneAndUpdate({_id:id},
                {name,description}
                )
 
            category?.save();

            res.status(StatusCodes.OK).json({message: "Category deleted successfully!"});
        }
        catch(error){
            res.status(StatusCodes.BAD_REQUEST).json({message: "An error occured"});
        }
    }

       //METHOD DELETE
       //Delete a category
       public async delete (req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params;

            const category:any = await CategoryModel.findOneAndDelete({_id:id})
 
            category?.save();

            res.status(StatusCodes.OK).json({message: "Category deleted successfully!"});
        }
        catch(error){
            res.status(StatusCodes.BAD_REQUEST).json({message: "An error occured"});
        }
    }

    //Method GET
    //Get all existing categories
    public async getAll (req:Request, res: Response, next: NextFunction) {
        try{
            const categories = await CategoryModel.find();
    
            return res.status(StatusCodes.OK).json({message: categories});
        }
        catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: error});
        }

    }
    //Method GET
    //Get one category 
    public async get (req:Request, res: Response, next: NextFunction) {
        try{
            const id = req.body._id;

            const categories = await CategoryModel.findOne({_id: id});

            if(categories === null){
                return res.status(StatusCodes.NOT_FOUND).json({message: "No such category in DB"});
            }

            return res.status(StatusCodes.OK).json({message: "Success"});
        }
        catch(error){
            return res.status(StatusCodes.BAD_REQUEST).json({message: "An error occured"});
        }

    }
}

