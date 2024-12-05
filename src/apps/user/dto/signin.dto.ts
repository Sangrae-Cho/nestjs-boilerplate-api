import { IsEmail, Length, IsNotEmpty } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  @Length(150)
  email: string;

  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
