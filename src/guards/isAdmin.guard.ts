import { CanActivate } from '@nestjs/common';

export class IsAdminGuard implements CanActivate {
  canActivate() {
    return true;
  }
}
