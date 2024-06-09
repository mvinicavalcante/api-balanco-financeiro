import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ProjectionType, Types } from 'mongoose';
import {
  FinancialStatement,
  FinancialStatementDocument,
} from 'src/schemas/financial-statement/financial-statement.schema';
import { CreateFinancialStatementDTO } from './dto/create-financial-statement.dto';
import { UsersService } from '../users/users.service';
import { PaginationDTO } from 'src/utils/paginate-dto/pagination.dto';
import {
  filtersFinancialStatementDTO,
  getFinancialStatementResponseDTO,
} from './dto/get-financial-statement.dto';

import utilsPaginate from 'src/utils/paginate/paginate';

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
      {},
      fields,
      {
        lean: true,
        ...utilsPaginate(pagination),
      },
    )) as FinancialStatement[];

    return {
      financialStatements: financialStatements,
      total: await this.financialStatement.countDocuments({
        userId: new Types.ObjectId(userId),
        ...filters,
      }),
      page,
      limit,
    };
  }
}
