import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserEntity } from './interface/user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm/repository/Repository';
import { Builder } from 'builder-pattern';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import * as process from 'process';
import { imageDev } from 'src/common/constants/image.constants';
import { join } from 'path';

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

    const newUser = this.userRepository.create(userBuilder);
    return this.userRepository.save(newUser);
  }

  async sendEmail(user: IUserEntity, fileIds: string[]) {
    const attachments = fileIds?.map((fileId) => {
      const pathFile = join(process.cwd(), 'public', 'uploads', fileId);
      return {
        filename: fileId,
        content: "this is my content",
        path: pathFile,
        contentType: '*',
      }
    });

    const emailOptions: ISendMailOptions = {
      to: ['vuxuanhuy2k1@gmail.com', 'xkaioken9x@gmail.com'],
      from: process.env.MAIL_FROM,
      subject: 'fucking my website',
      template: './welcome',
      context: {
        name: "user.username",
        imageUrl: imageDev,
        heros: ['yasuo', 'zed', 'sherlock']
      },
      html: '<h1>How to learn everything?</h1>',
      attachments
    }

    const success = await this.mailerService.sendMail(emailOptions);
    return !!success && emailOptions
  }

  async findUser(email: string) {
    return await this.userRepository.findOneBy({ email });
  }
}
