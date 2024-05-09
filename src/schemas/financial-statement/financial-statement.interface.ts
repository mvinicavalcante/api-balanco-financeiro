import { Types } from 'mongoose';

export enum ICategories {
  FOOD = 'food',
  TRANSPORT = 'transport',
  SHOPPING = 'shopping',
  HEALTH = 'health',
  ENTERTAINMENT = 'entertainment',
  SALARY = 'salary',
  BONUS = 'bonus',
  OTHERS = 'others',
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
