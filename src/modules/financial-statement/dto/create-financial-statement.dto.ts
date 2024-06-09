import {
  ICategories,
  ITypes,
} from 'src/schemas/financial-statement/financial-statement.interface';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateFinancialStatementDTO {
  @ApiProperty({
    description: 'Date',
    type: Date,
    nullable: false,
    default: new Date(),
  })
  @IsOptional()
  @IsDate()
  date = new Date();

  @ApiProperty({
    description: 'Description',
    type: String,
    nullable: false,
  })
  @IsDefined()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Amount',
    type: Number,
    nullable: false,
  })
  @IsDefined()
  @IsNumber()
  amount: number;

  @ApiProperty({
    description: 'Type',
    type: String,
    nullable: false,
    enum: ITypes,
  })
  @IsDefined()
  @IsEnum(ITypes)
  type: ITypes;

  @ApiProperty({
    description: 'Category',
    type: String,
    nullable: false,
    enum: ICategories,
  })
  @IsDefined()
  @IsEnum(ICategories)
  category: ICategories;

  @ApiProperty({
    description: 'User Id',
    type: String,
    nullable: false,
  })
  @IsDefined()
  @IsString()
  userId: string;
}
