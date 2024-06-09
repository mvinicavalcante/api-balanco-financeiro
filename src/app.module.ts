import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigModule } from './config/mongoose';
import { ModulesModule } from './modules/modules.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseConfigModule,
    ModulesModule,
    CacheModule.register({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
