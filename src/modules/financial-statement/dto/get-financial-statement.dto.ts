import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { PaginationDTO } from 'src/utils/pagination/pagination.dto';

export class getFinancialStatementDTOParam {
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

export class getFinancialStatementDTOQuery extends PaginationDTO {}
