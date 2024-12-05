import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../libs/typeorm/typeorm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.ENV_FILE || '.env',
      isGlobal: true,
    }), // 환경 변수 설정
    DatabaseModule,
  ],
})
export class CommonModule {}
