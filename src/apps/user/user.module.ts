import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../../libs/typeorm/entities/user.entity';
import { UserService } from './user.service';
import { CommonModule } from '../common.module';
import { AuthModule } from 'src/libs/auth/auth.module';

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
