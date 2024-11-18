import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../../libs/typeorm/entity/user.entity';
import { UserService } from './user.service';
import { AppModule } from '../app.module';
import { AuthModule } from 'src/libs/auth/auth.module';

@Module({
  imports: [AppModule, TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
