import { IsEmail, Length, IsDate, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(30)
  name?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;

  @IsOptional()
  @IsEmail()
  @Length(150)
  email?: string;
}
