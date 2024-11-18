import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatus } from '../../libs/typeorm/entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userData: CreateUserDto): Promise<any> {
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = await this.userRepository.save({
      ...userData,
      birth_date: userData.birthDate,
    });
    return user.no;
  }

  async updateUser(no: number, updateUserData: UpdateUserDto): Promise<any> {
    return await this.userRepository.update({ no }, updateUserData);
  }

  async getUserInformation(no: number): Promise<any> {
    return await this.userRepository.findOne({
      where: { no },
      select: ['name', 'email', 'birth_date'],
    });
  }

  async withraw(no: number): Promise<any> {
    return await this.userRepository.update(
      { no },
      { status: UserStatus.WITHDRAW },
    );
  }
}
