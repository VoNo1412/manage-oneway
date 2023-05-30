import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestUser } from '../interface/request.interface';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<IRequestUser>();
    return data ? request.user[data] : request.user;
  },
);
