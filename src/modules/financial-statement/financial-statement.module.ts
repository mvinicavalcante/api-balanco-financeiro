import { Module } from '@nestjs/common';
import { FinancialStatementController } from './financial-statement.controller';
import { FinancialStatementService } from './financial-statement.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  FinancialStatement,
  FinancialStatementSchema,
} from 'src/schemas/financial-statement/financial-statement.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FinancialStatement.name, schema: FinancialStatementSchema },
    ]),
    UsersModule,
  ],
  controllers: [FinancialStatementController],
  providers: [FinancialStatementService],
  exports: [FinancialStatementService],
})
export class FinancialStatementModule {}
