import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseConfigModule } from './config/mongoose';
import { SchemasModule } from './schemas/schemas.module';
import { ModulesModule } from './modules/modules.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    MongooseConfigModule,
    SchemasModule,
    ModulesModule,
    CacheModule.register({
      isGlobal: true
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
