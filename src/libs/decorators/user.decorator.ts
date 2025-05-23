import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from '../dto/user.dto';
import { AppException } from '../exceptions/app.exception';

export const GetUser = createParamDecorator<void, UserDto>(
  (_data, ctx): UserDto => {
    const req = ctx.switchToHttp().getRequest<Request & { user?: UserDto }>();
    const user = req.user;

    if (!user) {
      throw new AppException('USER_NOT_FOUND');
    }
    return user;
  },
);
