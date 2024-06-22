import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizeAdminAccountGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const { headers } = context.switchToHttp().getRequest();

    const token = this.jwtService.decode(headers['x-access-token']);

    return token.role === 1;
  }
}
