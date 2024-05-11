import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigModule } from './config/mongoose';
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseConfigModule,
    ModulesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
