import { IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { FinancialStatement } from '../../../schemas/financial-statement/financial-statement.schema';
import { PaginationResponseDTO } from '../../../utils/paginate-dto/pagination.dto';
import {
  Categories,
  FlowTypes,
} from 'src/schemas/financial-statement/financial-statement.interface';
import { Transform } from 'class-transformer';

export class getFinancialStatementDTO {
  @ApiProperty({
    description: 'ID of the financial statement',
    required: true,
    type: String,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  userId: string;
}

export class filtersFinancialStatementDTO {
  @ApiProperty({
    description: 'Description',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Amount',
    required: false,
    type: Number,
  })
  @IsOptional()
  amount?: number;

  @ApiProperty({
    description: 'Type',
    enum: FlowTypes,
    required: false,
    type: String,
  })
  @IsOptional()
  @IsEnum(FlowTypes)
  type?: FlowTypes;

  @ApiProperty({
    description: 'Category',
    required: false,
    enum: Categories,
    type: String,
  })
  @IsOptional()
  @IsEnum(Categories)
  category?: Categories;

  @ApiProperty({
    description: 'Min Date',
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsDate()
  minDate?: Date;

  @ApiProperty({
    description: 'Max Date',
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsDate()
  maxDate?: Date;
}

export class filtersStatementFinancialStatementDTO {
  @ApiProperty({
    description: 'Min Date',
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value))
  minDate?: Date;

  @ApiProperty({
    description: 'Max Date',
    required: false,
    type: Date,
  })
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => (value ? new Date(value) : value))
  maxDate?: Date;
}

export class getFinancialStatementResponseDTO extends PaginationResponseDTO {
  @ApiProperty({
    description: 'Financial statements',
    required: true,
    type: [FinancialStatement],
  })
  @IsDefined()
  financialStatements: FinancialStatement[];
}

export class getStatementFinancialStatementResponseDTO {
  @ApiProperty({
    description: 'Balance',
    required: true,
    type: Number,
  })
  @IsDefined()
  balance: number;

  @ApiProperty({
    description: 'Health',
    required: true,
    type: Number,
  })
  @IsDefined()
  health: number;

  @ApiProperty({
    description: 'Inflow',
    required: true,
    type: Number,
  })
  @IsDefined()
  inflow: number;

  @ApiProperty({
    description: 'Outflow',
    required: true,
    type: Number,
  })
  @IsDefined()
  outflow: number;

  @ApiProperty({
    description: 'Statements',
    required: true,
    type: Number,
  })
  @IsDefined()
  statements: number;
}
