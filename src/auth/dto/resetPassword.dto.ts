import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class ResetPassword {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
