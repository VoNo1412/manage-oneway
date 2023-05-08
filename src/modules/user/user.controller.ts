import { Controller, Get, Param, Res} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { join } from 'path';

@ApiTags('User')
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
}
