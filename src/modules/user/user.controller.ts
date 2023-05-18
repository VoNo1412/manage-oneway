import { Controller, Get, Param, Post, Query, Res, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';
import { IUserEntity } from './interface/user.interface';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/common/decorators/user.decorators';
import { QueryUserDto } from './dto/query-user.dto';

@ApiTags('User')
// @UseGuards(AuthGuard('local'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    @CurrentUser() user: IUserEntity
  ) {
    return await this.userService.sendEmail(user, userDto.fileIds);
  }
}
