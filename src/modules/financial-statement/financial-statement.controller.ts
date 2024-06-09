import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FinancialStatementService } from './financial-statement.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFinancialStatementDTO } from './dto/create-financial-statement.dto';
import {
  getFinancialStatementDTO,
  getFinancialStatementResponseDTO,
} from './dto/get-financial-statement.dto';
import { PaginationDTO } from 'src/utils/paginate-dto/pagination.dto';

@Controller('financial-statement')
@ApiTags('financial-statement')
export class FinancialStatementController {
  constructor(
    private readonly financialStatementService: FinancialStatementService,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create a financial statement' })
  @ApiResponse({
    status: 201,
    description: 'Financial Statement successfully',
    type: CreateFinancialStatementDTO,
  })
  async create(@Body() data: CreateFinancialStatementDTO) {
    return await this.financialStatementService.create(data);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get financial statement by user id' })
  @ApiResponse({
    status: 200,
    description: 'Financial Statement found',
  })
  async getFinancialStatementByUserId(
    @Param() params: getFinancialStatementDTO,
    @Query() pagination: PaginationDTO,
  ): Promise<getFinancialStatementResponseDTO> {
    return await this.financialStatementService.getFinancialStatementByUserId(
      params.userId,
      pagination,
    );
  }
}
