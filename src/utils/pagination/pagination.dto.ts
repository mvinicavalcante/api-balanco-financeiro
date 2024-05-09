import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO {
  @ApiProperty({
    description: 'Page number',
    required: false,
    type: Number,
    default: 1,
  })
  page = 1;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    type: Number,
    default: 10,
  })
  limit = 15;
}
