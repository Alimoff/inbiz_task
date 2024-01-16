import express, { Application } from 'express'
import cors from 'cors'
import cokierPreser from 'cookie-parser'
import morgan from 'morgan'
import { router } from './route'

export const app: Application = express()
//Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
//registretion router
app.use(router)
//regiteriation cokies
app.use(cokierPreser())

