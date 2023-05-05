import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserEntity } from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Builder } from 'builder-pattern';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

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

    const newUser =  this.userRepository.create(userBuilder);
    return this.userRepository.save(newUser);
  }

  async findUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
