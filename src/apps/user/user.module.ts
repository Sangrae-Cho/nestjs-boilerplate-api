import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from '../../libs/typeorm/entity/user.entity';
import { UserService } from './user.service';
import { AppModule } from '../app.module';

@Module({
  imports: [AppModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
