import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule, JwtModule.register({
    global: true
  })],
  providers: [AuthService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}