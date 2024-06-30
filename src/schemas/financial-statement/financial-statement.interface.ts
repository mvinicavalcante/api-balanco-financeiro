import { Types } from 'mongoose';

export enum Categories {
  STATIONERY_SHOP = 'stationery_shop',
  BANK_BUSINESS = 'bank_business',
  INTERNAL_SPENDING = 'internal_spending',
  OTHER = 'other',
}

export enum FlowTypes {
  CASH_INFLOW = 'cash_inflow',
  CASH_OUTFLOW = 'cash_outflow',
}

export interface IFinancialStatement {
  _id?: Types.ObjectId;
  __v?: number;
  date?: Date;
  description: string;
  amount: number;
  type: FlowTypes;
  category: Categories;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
