import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Categories,
  IFinancialStatement,
  FlowTypes,
} from './financial-statement.interface';
import { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type FinancialStatementDocument = HydratedDocument<FinancialStatement>;

@Schema()
export class FinancialStatement implements IFinancialStatement {
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
    description: 'Date',
    type: Date,
    nullable: false,
  })
  @Prop({ required: false, type: Date, default: new Date() })
  date?: Date;

  @ApiProperty({
    description: 'Description',
    type: String,
    nullable: false,
  })
  @Prop({ required: true, type: String })
  description: string;

  @ApiProperty({
    description: 'Amount',
    type: Number,
    nullable: false,
  })
  @Prop({ required: true, type: Number })
  amount: number;

  @ApiProperty({
    description: 'Type',
    type: String,
    nullable: false,
  })
  @Prop({ required: true, type: String, enum: FlowTypes })
  type: FlowTypes;

  @ApiProperty({
    description: 'Category',
    type: String,
    nullable: false,
  })
  @Prop({ required: true, type: String, enum: Categories })
  category: Categories;

  @ApiProperty({
    description: 'User Id',
    type: String,
    nullable: false,
  })
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;
}

export const FinancialStatementSchema =
  SchemaFactory.createForClass(FinancialStatement);
