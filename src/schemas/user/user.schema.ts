import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUser } from './user.interface';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User implements IUser {
  @ApiProperty({
    description: 'FinancialStatement Id',
    type: String,
    nullable: false,
  })
  _id?: Types.ObjectId;

  @ApiProperty({
    description: 'Version',
    type: Number,
  })
  __v?: number;

  @ApiProperty({
    description: 'Name',
    type: String,
    nullable: false,
  })
  @Prop({ required: true, type: String })
  name: string;

  @ApiProperty({
    description: 'Email',
    type: String,
    nullable: false,
  })
  @Prop({ required: true, type: String })
  email: string;

  @ApiProperty({
    description: 'Password',
    type: String,
    nullable: false,
  })
  @Prop({ required: true, type: String })
  password: string;

  @ApiProperty({
    description: 'Is Admin',
    type: Boolean,
  })
  @Prop({ required: false, type: Boolean, default: false })
  isAdmin?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
