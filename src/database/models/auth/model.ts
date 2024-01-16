import { model, Schema } from 'mongoose';
import { IAuth } from './types';
import { Role } from '../../../types/common';

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
  role: {
    type: String,
    enum: [Role.LEGAL, Role.INDIVIDUAL, Role.ADMIN],
    default:Role.INDIVIDUAL,
  }
})

export const User = model<IAuth>('User', Auth)