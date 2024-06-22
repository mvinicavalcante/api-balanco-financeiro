import { Module } from '@nestjs/common';
import { AuthorizeAdminAccountGuard } from './isAdmin.guard';
import { IsAuthenticated } from './IsAuthenticated.guard';

@Module({
  providers: [AuthorizeAdminAccountGuard, IsAuthenticated],
})
export class GuardsModule {}
