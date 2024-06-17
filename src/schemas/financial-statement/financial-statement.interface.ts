import { Types } from 'mongoose';

export enum ICategories {
  STATIONEY_SHOP = 'stationery_shop',
  BANK_BUSINESS = 'bank_business',
  INTERNAL_SPENDING = 'internal_spending',
  OTHER = 'other',
}

export enum ITypes {
  CASH_INFLOW = 'cash_inflow',
  CASH_OUTFLOW = 'cash_outflow',
}

export interface IFinancialStatement {
  _id?: Types.ObjectId;
  __v?: number;
  date?: Date;
  description: string;
  amount: number;
  type: ITypes;
  category: ICategories;
  userId: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
