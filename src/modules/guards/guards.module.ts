import { Module } from '@nestjs/common';
import { AuthorizeAdminAccountGuard } from './isAdmin.guard';
import { IsAuthenticated } from './isAuthenticated.guard';

@Module({
  providers: [AuthorizeAdminAccountGuard, IsAuthenticated],
  exports: [
    IsAuthenticated,
    AuthorizeAdminAccountGuard
  ]
})
export class GuardsModule {}
