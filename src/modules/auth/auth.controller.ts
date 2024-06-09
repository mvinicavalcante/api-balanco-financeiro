import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login-dto';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
  })
  @Post('login')
  async login(@Body() data: LoginDto) {
    const result = await this.authService.login(data.email, data.password);
    return result;
  }
}
