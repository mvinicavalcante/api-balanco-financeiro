import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({ required: false, type: Number, default: 0 })
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  page = 0;

  @ApiProperty({ required: false, type: Number, default: 50 })
  @IsOptional()
  @Min(0)
  @Max(250)
  @Transform(({ value }) => (value ? Number(value) : undefined))
  limit = 50;
}

export class PaginationResponseDTO {
  @ApiProperty({ type: Number, required: true })
  total: number;

  @ApiProperty({ type: Number, required: true })
  page: number;

  @ApiProperty({ type: Number, required: true })
  limit: number;
}
