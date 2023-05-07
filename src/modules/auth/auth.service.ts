import { Injectable } from '@nestjs/common';
import { IUserEntity } from '../user/interface/user.interface';
import { UserService } from '../user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<IUserEntity> {
    return await this.userService.createUser(createAuthDto);
  }

  async validateUser(email: string, pass: string): Promise<IUserEntity> {
    const user: any = await this.userService.findUser(email);

    if (user && await user.verifyPassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
