import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @ApiProperty({
    description: 'Email of the user',
    required: true,
    type: String
  })
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user',
    required: true,
    type: String,
  })
  @IsDefined()
  @IsNotEmpty()
  password: string
}

