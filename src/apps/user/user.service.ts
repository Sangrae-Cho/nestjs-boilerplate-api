import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatus } from '../../libs/typeorm/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userRepository.save({
      ...createUserDto,
    });
    return user.no;
  }

  async updateUser(no: number, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.userRepository.update({ no }, updateUserDto);
  }

  async getUserInformation(no: number): Promise<any> {
    return await this.userRepository.findOne({
      where: { no },
      select: ['name', 'email', 'birthDate'],
    });
  }

  async withdraw(no: number): Promise<any> {
    return await this.userRepository.update(
      { no },
      { status: UserStatus.WITHDRAW },
    );
  }

  async signin(
    signinDto: SigninDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findOne({
      where: { email: signinDto.email },
      select: ['no', 'password'],
    });

    if (!user) {
      throw new NotFoundException();
    }

    if (!(await bcrypt.compare(signinDto.password, user.password))) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.sign({ no: user.no });
    const refreshToken = this.jwtService.sign({ no: user.no });

    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ lastLogin: () => 'NOW()' })
      .where('no = :no', { no: user.no })
      .execute();

    return { accessToken, refreshToken };
  }
}
