import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user/user.schema';
import {
  FinancialStatement,
  FinancialStatementSchema,
} from './financial-statement/financial-statement.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: FinancialStatement.name, schema: FinancialStatementSchema },
    ]),
  ],
})
export class SchemasModule {}
