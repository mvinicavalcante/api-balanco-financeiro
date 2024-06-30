import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, Types } from 'mongoose';
import {
  FinancialStatement,
  FinancialStatementDocument,
} from '../../schemas/financial-statement/financial-statement.schema';
import { CreateFinancialStatementDTO } from './dto/create-financial-statement.dto';
import { UsersService } from '../users/users.service';
import { PaginationDTO } from '../../utils/paginate-dto/pagination.dto';
import {
  filtersFinancialStatementDTO,
  getFinancialStatementResponseDTO,
  getStatementFinancialStatementResponseDTO,
} from './dto/get-financial-statement.dto';

import utilsPaginate from '../../utils/paginate/paginate';
import { FlowTypes } from 'src/schemas/financial-statement/financial-statement.interface';
import { createDateFilter } from 'src/utils/filterDate';

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
    pagination: PaginationDTO,
    filters?: filtersFinancialStatementDTO,
    fields?: ProjectionType<FinancialStatement>,
  ): Promise<getFinancialStatementResponseDTO> {
    const { page, limit } = pagination;
    const financialStatements = (await this.financialStatement.find(
      { userId },
      fields,
      {
        lean: true,
        ...utilsPaginate(pagination),
      },
    )) as FinancialStatement[];

    return {
      financialStatements: financialStatements,
      total: await this.financialStatement.countDocuments({
        userId: userId,
        ...filters,
      }),
      page,
      limit,
    };
  }

  async getStatementFinancialStatementByUserId(
    userId: string,
    filters?: { minDate?: Date; maxDate?: Date },
  ): Promise<getStatementFinancialStatementResponseDTO> {
    const dateFilter = createDateFilter(filters);

    const [inflowDocuments, outflowDocuments, statementsCount] =
      await Promise.all([
        this.financialStatement
          .find({
            userId,
            type: FlowTypes.CASH_INFLOW,
            ...dateFilter,
          })
          .select('amount -_id')
          .lean(),
        this.financialStatement
          .find({
            userId,
            type: FlowTypes.CASH_OUTFLOW,
            ...dateFilter,
          })
          .select('amount -_id')
          .lean(),
        this.financialStatement.countDocuments({
          userId,
          ...dateFilter,
        }),
      ]);

    const totalInflow = inflowDocuments.reduce(
      (sum, doc) => sum + doc.amount,
      0,
    );
    const totalOutflow = outflowDocuments.reduce(
      (sum, doc) => sum + doc.amount,
      0,
    );

    return {
      balance: totalInflow - totalOutflow,
      health: totalInflow > totalOutflow ? 1 : 0,
      inflow: totalInflow,
      outflow: totalOutflow,
      statements: statementsCount,
    };
  }
}
