import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: string, context: ExecutionContext): any => {
    const request = context.switchToHttp().getRequest<any>();
    return data ? request.user[data] : request.user;
  },
);
