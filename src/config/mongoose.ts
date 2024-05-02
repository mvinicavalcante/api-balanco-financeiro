import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_CLUSTER}`,
        dbName: process.env.DB_CONNECTION_NAME,
      }),
    }),
  ],
})
export class MongooseConfigModule {}
