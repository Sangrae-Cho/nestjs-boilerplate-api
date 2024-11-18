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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post() // 회원 가입
  signup(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
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
    return this.userService.updateUser(user.no, updateUserDto);
  }

  @Delete() // 회원 탈퇴
  @UseGuards(JwtAuthGuard)
  withdraw(@CurrentUser() user: any) {
    return this.userService.withraw(user.no);
  }
}
