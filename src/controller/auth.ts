import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../database/models/auth';
import { StatusCodes } from 'http-status-codes';
import CreateHttpError from "http-errors"
import { Role } from '../types/common';
import { emailRegex } from '../constant/regex';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();


export class AuthController {
  //METHOD POST
  // Create user
  public async signup(req: Request, res: Response, next: NextFunction) {
    try{
      const {name, surname, email, password,role} = req.body

      // emailRegex.test(email);
       
      if ([Role.ADMIN, Role.SUPERADMIN].includes(role)){
        res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid role for signup"});
      }

      let findUser= await User.findOne({email});

      if(findUser) {
        throw CreateHttpError(
          StatusCodes.BAD_REQUEST,
          `User with ${email} already signed up`
        );
      }

      const hashPassword = bcrypt.hashSync(password, 12);
      const newUser = new User({
        name,surname,email,password:hashPassword,role});

       await newUser.save();

        const accessToken = createAccessToken({ id: newUser._id});
        const refreshToken = createRefreshToken({id:newUser._id});

        res.cookie('refreshtoken', refreshToken, {
          httpOnly: true,
          path: 'user/refresh_token',
          maxAge: 7*24*60*60*1000,
        })

      return res.status(StatusCodes.OK).json({name, surname, email, role, accessToken});
    }catch (message){
      return res.status(StatusCodes.BAD_REQUEST).json({message})
    }
  } 

  //METHOD POST
  //Sign in 
  public async signin(req:Request, res: Response, next: NextFunction){
    try{
      const {email, password} = req.body;

      let findUser: any = await User.findOne({email});

      if(!findUser){
        throw CreateHttpError(
          StatusCodes.NOT_FOUND,
          `${email} has not signed up!`
        );
      }

      const isMatch = bcrypt.compare(password, findUser.password);

      if(!isMatch) return res.status(StatusCodes.NOT_FOUND).json({msg: "Incorrect password"});

    const accessToken = createAccessToken({ id: findUser._id })
    const refreshtoken = createRefreshToken({ id: findUser._id })

    res.cookie('refreshtoken', refreshtoken, {
      httpOnly: true,
      path: '/user/refresh_token',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    findUser.refreshtoken = refreshtoken;
    await findUser.save();

    return res.json({ accessToken, findUser });
    //@ts-ignore
    }catch(message){
      res.status(StatusCodes.BAD_REQUEST).json({message});
    }
  }

public async signout (req:Request, res: Response, next: NextFunction){
  try{
  const {email} = req.body;

  let user: any = await User.findOne({email});

  if(!user){
    res.status(StatusCodes.NOT_FOUND).json({message: "User not found"});
  }else{
    res.clearCookie('refreshtoken',{path: '/user/refresh_token'});  
  }

  user.refreshtoken = null;
  await user.save();

  return res.status(StatusCodes.OK).json({msg: "Logged out"});
}catch(message){
  return res.status(StatusCodes.BAD_REQUEST).json({message: "Internal server error"});
}

}

public async createAdmin (req:Request, res:Response){
    try{
      const {name, surname, email, password,role} = req.body

    
      if (![Role.ADMIN, Role.SUPERADMIN].includes(role)){
        return res.status(StatusCodes.BAD_REQUEST).json({error: "Invalid role for signup admin or superadmin"});
      }

      let findUser:any = await User.findOne({email})

      if (!findUser) {
        findUser = await User.findOne({email, role:Role.ADMIN || role.SUPERADMIN});
      }

      if(findUser) {
        throw CreateHttpError(
          StatusCodes.BAD_REQUEST,
          `User with ${email} already signed up as an admin`
        );
      }

      const hashPassword = bcrypt.hashSync(password, 12);
      const newUser = new User({
        name,surname,email,password:hashPassword,role});

        await newUser.save();

        const accessToken = createAccessToken({ id: newUser._id});
        const refreshToken = createRefreshToken({id:newUser._id});

        res.cookie('refreshtoken', refreshToken, {
          httpOnly: true,
          path: '/', // Set to the root path
          maxAge: 7*24*60*60*1000,
        });

      res.status(StatusCodes.OK).json({name, surname, email,role, accessToken});
    }catch (message){
      return res.status(StatusCodes.BAD_REQUEST).json({message})
    }
  }

  public async getAllUsers (req: Request, res: Response){
    try{
    const allUsers = await User.find();

    res.status(StatusCodes.OK).json({allUsers});

    }catch(message){
      res.status(StatusCodes.BAD_REQUEST).json({message: "Internal server error"})
    }
  }
}


const createAccessToken = (user: any): string => {

  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: moment.duration(30, 'days').asSeconds() });
}

const createRefreshToken = (user: any): string => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: moment.duration(15, 'days').asSeconds() });
}
