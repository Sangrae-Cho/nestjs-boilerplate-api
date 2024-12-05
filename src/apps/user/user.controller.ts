import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/libs/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/libs/decorators/current-user.decorator';
import { SigninDto } from './dto/signin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post() // 회원 가입
  signup(@Body() createUserDto: CreateUserDto) {
    this.userService.createUser(createUserDto);
    return;
  }

  @Get() // 회원 정보 조회
  @UseGuards(JwtAuthGuard)
  getUserInfo(@CurrentUser() user: any) {
    return this.userService.getUserInformation(user.no);
  }

  @Patch() // 회원 정보 수정
  @UseGuards(JwtAuthGuard)
  updateUserInfo(
    @CurrentUser() user: any,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    this.userService.updateUser(user.no, updateUserDto);
    return;
  }

  @Delete() // 회원 탈퇴
  @UseGuards(JwtAuthGuard)
  withdraw(@CurrentUser() user: any) {
    this.userService.withdraw(user.no);
    return;
  }

  @Patch('/signin')
  signin(@Body() signinDto: SigninDto) {
    return this.userService.signin(signinDto);
  }
}
