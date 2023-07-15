import { Body, Controller, Get, Param, Post, Query, Res, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { IUserEntity } from './interface/user.interface';
import { QueryUserDto } from './dto/query-user.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { User } from '../../common/decorators/user.decorators';


@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('avatar/:fileId')
  async exportFile(
    @Param('fileId') fileId: string,
    @Res() res: Response) {
    const pathFile = join(process.cwd(), 'public', 'uploads', fileId);
    return res.download(pathFile)
  }

  @Post('sendEmail')
  async sendEmail(
    @Query() userDto: QueryUserDto,
    @User() user: IUserEntity
  ) {
    return await this.userService.sendEmail(user, userDto.fileIds);
  }

  @Post('send')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        to: { type: 'string', default: 'xkaioken9x@gamil.com' },
        subject: { type: 'string', default: 'How to patient before everything!' },
        text: { type: 'string', default: 'fuking 1412' },
        files: {
          type: 'array',
          items: {
            type: "string",
            format: 'binary'
          }
        },

      },
    },
  })
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      storage: diskStorage({
        destination: './public/uploads',
        filename: (req, file, callback) => {
          const filePath = `./public/uploads/${file.originalname}`;
          const randomThing = Array(3)
          .fill(null)
          .map(() => Math.round(Math.random() * 54237).toString(16))
          .join('');
          callback(null, `${"file"}${randomThing}${Date.now()}${file.originalname}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  async sendEmailWithAttachment(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('to') to: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ) {
    try {
      const attachments = files?.map(({ filename }) => {
        // const pathFile = join(process.cwd(), 'public', 'uploads', filename);
        return {
          filename: "file8dfc971bd8c1684406929082devops.xlsx",
          content: "this is my content",
          path: "http://14.225.204.231:8080/public/uploads/file8dfc971bd8c1684406929082devops.xlsx",
          contentType: '*',
        }
      });

      return await this.userService.sendEmailWithAttachment(to.trim(), subject.trim(), text.trim(), attachments);
    } catch (error) {
      return {
        message: error.message,
      };
    }
  }

  
}
