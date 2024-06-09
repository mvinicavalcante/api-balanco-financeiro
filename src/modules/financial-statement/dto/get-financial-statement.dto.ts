import { IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { FinancialStatement } from 'src/schemas/financial-statement/financial-statement.schema';
import { PaginationResponseDTO } from 'src/utils/paginate-dto/pagination.dto';

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
}

export class getFinancialStatementResponseDTO extends PaginationResponseDTO {
  financialStatements: FinancialStatement[];
}
