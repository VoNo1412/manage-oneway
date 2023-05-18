import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IRequestUser } from '../interface/request.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<IRequestUser>();
    return request.user;
  },
);
