import express, { Application } from 'express';
import cors from 'cors';
import cokierPreser from 'cookie-parser';
import morgan from 'morgan';
import { router } from './route';
import { User } from './database/models/auth';
import session from 'express-session';
import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

dotenv.config();

const secretKey:any = process.env.ACCESS_TOKEN_SECRET;

export const app: Application = express();
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//registretion router
app.use(router);
//regiteriation cokies
app.use(cokierPreser());

app.use(session({
    secret: 'Site visit',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge : 6000000 }
}));


