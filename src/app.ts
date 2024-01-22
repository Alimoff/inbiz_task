import express, { Application } from 'express';
import cors from 'cors';
import cokierPreser from 'cookie-parser';
import morgan from 'morgan';
import { router } from './route';
import session from 'express-session';
import passport from 'passport';
import http from 'http';
import * as path from 'path';
const socketIO = require('socket.io');
// import {initSocketIO} from './socket/socketIO';
import dotenv from 'dotenv';
dotenv.config();

export const app: Application = express();
const server = http.createServer(app);
// initSocketIO(server);
export const io = socketIO(server);

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//registretion router
app.use(router);
//regiteriation cokies
app.use(cokierPreser());

//Upload files to folder named `static`
app.use('/static', express.static(path.join(__dirname, '../', '/static')));

app.use(session({
    secret: 'Site visit',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge : 6000000 }
}));

// io.on("connection", async (socket:any) => {
//     console.log("A user connected", socket.id);
  
//     socket.on("chat message", async (message:any) => {
//       console.log("message from client", JSON.parse(message));
//       io.emit("chat message", JSON.stringify(message));
//     });
//            // Emit a welcome message to the user
//            socket.emit('newMessage', {
//             from: 'Server',
//             text: 'Welcome to the e-commerce chat!',
//             createdAt: new Date().getTime()
//         });

//         // Listen for messages from the user
//         socket.on('createMessage', (newMessage) => {
//             console.log('New message from user:', newMessage);

//             // You can broadcast this message to sellers or other users
//             io.emit('newMessage', {
//                 from: newMessage.from,
//                 text: newMessage.text,
//                 createdAt: new Date().getTime()
//             });
//         });

//     // Handle disconnect event
//     socket.on("disconnect", () => {
//       console.log("A user disconnected");
//     });
//   });