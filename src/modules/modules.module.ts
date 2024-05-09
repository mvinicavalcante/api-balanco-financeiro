import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FinancialStatementModule } from './financial-statement/financial-statement.module';

@Module({
  imports: [UsersModule, FinancialStatementModule],
})
export class ModulesModule {}
