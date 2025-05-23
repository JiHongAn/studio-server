// src/common/decorators/get-user.decorator.ts
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '../dtos/user.dto';

export const GetUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest<{ user?: UserDto }>();
    const user = request.user;
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  },
);
