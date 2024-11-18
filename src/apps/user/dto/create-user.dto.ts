import { IsNotEmpty, IsEmail, Length, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(30)
  name: string;

  @IsNotEmpty()
  @IsDate()
  birthDate: Date;

  @IsNotEmpty()
  @IsEmail()
  @Length(150)
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
