import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  FinancialStatement,
  FinancialStatementDocument,
} from 'src/schemas/financial-statement/financial-statement.schema';
import { CreateFinancialStatementDTO } from './dto/create-financial-statement.dto';
import { UsersService } from '../users/users.service';
import { getFinancialStatementDTOQuery } from './dto/get-financial-statement.dto';

@Injectable()
export class FinancialStatementService {
  constructor(
    @InjectModel(FinancialStatement.name)
    private financialStatement: Model<FinancialStatementDocument>,
    private readonly usersService: UsersService,
  ) {}

  async create(data: CreateFinancialStatementDTO): Promise<FinancialStatement> {
    const userExists = await this.usersService.findOne(
      new Types.ObjectId(data.userId),
    );
    if (!userExists) throw new NotFoundException('User not found');
    return await this.financialStatement.create(data);
  }

  async getFinancialStatementByUserId(
    userId: string,
    queryParams: getFinancialStatementDTOQuery,
  ): Promise<{
    financialStatements: FinancialStatement[];
    total: number;
  }> {
    const query = await this.financialStatement
      .find(new Types.ObjectId(userId))
      .skip((queryParams.page - 1) * queryParams.limit)
      .limit(queryParams.limit);

    return {
      financialStatements: query,
      total: await this.financialStatement.countDocuments(),
    };
  }
}
