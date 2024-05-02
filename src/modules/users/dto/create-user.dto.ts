import { IsDefined } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({
    description: 'Name of the user',
    required: true,
    type: String,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Email of the user',
    required: true,
    type: String,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    required: true,
    type: String,
  })
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  password: string;
}
