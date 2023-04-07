import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '@/users/users.service';
import { MessageName } from '@/message'
import { IncorrectException } from '@exceptions/incorrect.exception';
import { JWT_TYPE } from '@constants/jwt.type';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { ExistsException } from '@exceptions/exists.exeption';
import { ResetPassword } from './dto/resetPassword.dto';
import { ILike } from 'typeorm';
import { sendMail } from '@/utils/mail';
import { ChangePassword } from './dto/changePassword.dto';


@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }
  
  hashData(data: string) {
    return bcrypt.hashSync(data, 10);
  }

  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email
        },
        {
          secret: this.configService.get<string>(JWT_TYPE.JWT_ACCESS_SECRET),
          expiresIn: '1d',
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>(JWT_TYPE.JWT_REFRESH_SECRET),
          expiresIn: '7d',
        },
      ),
    ])

    return {accessToken, refreshToken}
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async login(data: AuthDto) {
    const {email, password} = data
    const user = await this.userService.findByEmail(email)

    // check user
    if (!user) throw new NotFoundException(MessageName.USER);

    // compase password
    const passwordMatches = user.comparePassword(password);
    if (!passwordMatches) throw new IncorrectException(MessageName.USER);
    
    // get token
    const tokens = await this.getTokens(user.id, email)
    delete user.password
    delete user.resetCode

    // update Refresh Token 
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user
    }
  }

  async register(createUserDto: CreateUserDto) {
    const userExists = await this.userService.findByEmail(
      createUserDto.email,
    );

    if (userExists) {
      throw new ExistsException(MessageName.USER);
    }

    // Hash password
    const hash = this.hashData(createUserDto.password);

    const newUser = await this.userService.create({
      ...createUserDto,
      password: hash,
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return {
      ...tokens,
      user: newUser,
    };
  }

  async resetPassword(dto: ResetPassword) {
    const user = await this.userService.findByEmail(dto.email)

    if (!user) {
      throw new NotFoundException(MessageName.USER);
    }

    const resetCode = Math.random().toString().slice(-4)
    await this.userService
      .repositoryService()
      .update({ email: ILike(dto.email)} , {resetCode})

     // send password to mail
     sendMail('forgotPassword', resetCode, user.email);
  }


  async changePassword(dto: ChangePassword) {
    const {email, code, password} = dto
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new NotFoundException(MessageName.USER);
    }

    if (code !== user.resetCode) {
      throw new IncorrectException(MessageName.RESET_CODE);
    }

    // update password and rest code
    await this.userService
      .repositoryService()
      .update(user.id, {
        password: bcrypt.hashSync(password, 12),
        resetCode: null
      })
  }

  async googleLogin(req: any) {
    if (!req?.user) {
      throw new NotFoundException(MessageName.USER);
    }

    const userExists = await this.userService.findByEmail(
      req.user.email,
    );
    if (userExists) {
      delete userExists.password
      delete userExists.resetCode 
    }

    const {email, firstName, lastName, accessToken} = req?.user
    const createUserDto = {
      name: firstName + lastName,
      email,
      password: ''
    }

    const newUser = !userExists && await this.userService.repositoryService().save(createUserDto)
    delete newUser.password
    delete newUser.resetCode

    const user = userExists || newUser
    return {
      ...user,
      accessToken
    }
  }
  
}
