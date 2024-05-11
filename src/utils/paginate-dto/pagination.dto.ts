import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { isNumberString, IsOptional, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({
    description: 'Page number',
    required: false,
    type: Number,
    default: 1,
  })
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => (isNumberString(value) ? Number(value) : undefined))
  page = 0;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    type: Number,
    default: 10,
  })
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => (isNumberString(value) ? Number(value) : undefined))
  limit = 15;
}
