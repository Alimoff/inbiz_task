import { model, Schema, SchemaTypes } from 'mongoose';
import { IAuth } from './types';
import { Role } from '../../../types/common';

const Auth = new Schema<IAuth>({
  email: {
    type: String,
    required: true,
    unique: true,

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
    enum: [Role.LEGAL, Role.INDIVIDUAL, Role.ADMIN, Role.SUPERADMIN],
    required: true,
  },
  notifications: [{
    type: SchemaTypes.ObjectId,
    ref: "Notification"
  }]
});

export const User = model<IAuth>('User', Auth)