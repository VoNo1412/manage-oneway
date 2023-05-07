import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserEntity } from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Builder } from 'builder-pattern';
import { MailerService } from '@nestjs-modules/mailer';
import * as process from 'process';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly mailerService: MailerService,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<IUserEntity> {
    const userBuilder = Builder<IUserEntity>()
      .username(createUserDto.username)
      .email(createUserDto.email)
      .password(createUserDto.password)
      .build();

    const checkExistUser = await this.findUser(userBuilder.email)
    if (checkExistUser) {
      throw new HttpException('Already exist email!', HttpStatus.BAD_REQUEST);
    }

    await this.mailerService.sendMail({
      to: userBuilder.email,
      from: process.env.MAIL_FROM,
      subject: 'Welcome to my website',
      template: './welcome',
      context: {
        name: userBuilder.username
      }
    })

    const newUser =  this.userRepository.create(userBuilder);
    return this.userRepository.save(newUser);
  }

  async findUser(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
