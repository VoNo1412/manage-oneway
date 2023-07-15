import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtHelper } from './helper/auth.helper';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { IUserEntity } from '../user/interface/user.interface';
import { UserModule } from '../user/user.module';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtHelper: JwtHelper;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
      ],
      providers: [
        AuthService,
        UserService,
        JwtHelper,
        ConfigService,
        User,
      ],
    }).compile();

    // authService = module.get<AuthService>(AuthService);
    // userService = module.get<UserService>(UserService);
    // jwtHelper = module.get<JwtHelper>(JwtHelper);
    // configService = module.get<ConfigService>(ConfigService);
  });

  describe('signUp', () => {
    it('should create a new user', async () => {
      const createdUser = {
        email: 'vono1412@gmail.com',
        password: '1412',
      } as IUserEntity;

      jest.spyOn(userService, 'createUser').mockResolvedValue(createdUser);
      const user = await userService.findUser(createdUser.email);
      const authDto = {
        email: 'vono1412@gmail.com',
        password: user.password,
      };
      const result = await authService.signUp(authDto);

      expect(userService.createUser).toHaveBeenCalledWith(authDto);
      expect(result).toBe(createdUser);
    });
  });

  // Rest of the test cases...
});
