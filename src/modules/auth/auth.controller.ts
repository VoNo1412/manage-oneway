import { Controller, Post, Body, UseGuards, Request, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IResponseDto } from 'src/common/response/response.dto';
import { IUserEntity } from '../user/interface/user.interface';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto): Promise<IResponseDto<IUserEntity>> {
    try {
      const newUser: IUserEntity = await this.authService.signUp(createAuthDto);
      return {
        status: HttpStatus.OK,
        data: newUser,
        message: 'Sign up success!'
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: error.message
      };
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any): Promise<IResponseDto<IUserEntity>> {
    try {
      const user: IUserEntity = req.user;
      return {
        status: HttpStatus.OK,
        data: user,
        message: 'Logged success!'
      };
    } catch (error) {
      return {
        status: HttpStatus.BAD_REQUEST,
        data: null,
        message: error.message
      };
    }
  }
}
