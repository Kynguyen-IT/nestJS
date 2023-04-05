import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  Length,
  MinLength,
} from 'class-validator';

export class ChangePassword {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(4)
  @IsNumberString()
  code: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
