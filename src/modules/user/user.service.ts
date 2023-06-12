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

  async createUser(createUserDto: CreateUserDto): Promise<any> {
    const userBuilder = Builder<IUserEntity>()
      .username(createUserDto?.username)
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
        filename: "file8dfc971bd8c1684406929082devops.xlsx",
        content: "this is my content",
        path: "http://14.225.204.231:8080/public/uploads/file8dfc971bd8c1684406929082devops.xlsx",
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

  async sendEmailWithAttachment(
    to: string, 
    subject: string, 
    text: string, 
    attachments: any) {

    await this.mailerService.sendMail({
      to,
      subject,
      text,
      attachments,
    });
  }

  async findUser(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }
}
