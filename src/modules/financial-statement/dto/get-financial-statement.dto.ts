import { IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

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
  description: string;
}
