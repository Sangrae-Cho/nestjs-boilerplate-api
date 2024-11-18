import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql', // 또는 'postgres', 'sqlite', 등
        host: process.env.DB_HOST || 'localhost',
        port: +process.env.DB_PORT || 3306,
        username: process.env.DB_USERNAME || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'test',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'], // 엔티티 경로
        synchronize: process.env.PROCESS_ENV === 'local' ? true : false, // 개발 환경에서만 true, 프로덕션에서는 false 권장
      }),
    }),
  ],
})
export class DatabaseModule {}
