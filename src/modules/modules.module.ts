import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FinancialStatementModule } from './financial-statement/financial-statement.module';

@Module({
  imports: [UsersModule, AuthModule, FinancialStatementModule],
  providers: [],
})
export class ModulesModule {}
