import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export class AuthorizeAdminAccountGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { headers } = context.switchToHttp().getRequest();

    const jwtService = new JwtService();

    const token = jwtService.decode(headers['x-access-token']);

    return token.role === 1;
  }
}
