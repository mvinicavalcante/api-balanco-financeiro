import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigModule } from './config/mongoose';
import { SchemasModule } from './schemas/schemas.module';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseConfigModule,
    SchemasModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
