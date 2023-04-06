import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ChangePassword } from './dto/changePassword.dto';
import { ResetPassword } from './dto/resetPassword.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() data: AuthDto) {
    return this.authService.login(data);
  }

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('reset-password')
  resetPassword(@Body() data: ResetPassword) {
    return this.authService.resetPassword(data);
  }

  @Post('change-password')
  changePassword(@Body() data: ChangePassword) {
    return this.authService.changePassword(data);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
