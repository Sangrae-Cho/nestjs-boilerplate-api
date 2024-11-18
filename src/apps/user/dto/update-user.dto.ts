import { Length, IsDate, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @Length(30)
  name?: string;

  @IsOptional()
  @IsDate()
  birthDate?: Date;
}
