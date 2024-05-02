import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from './user.interface';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: false, type: Boolean, default: false })
  isAdmin?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
