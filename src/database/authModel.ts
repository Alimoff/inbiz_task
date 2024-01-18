import { model, Schema } from 'mongoose'
import { IAuth } from "../interfaces/auth.interface";

const Auth = new Schema<IAuth>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

export const User = model<IAuth>('User', Auth)