import { Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  __v?: number;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
}
