import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppException } from '../../libs/exceptions/app.exception';
import { UserDto } from '../../libs/dtos/user.dto';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser extends UserDto = UserDto>(
    err: any,
    user: TUser | null,
  ): TUser {
    if (err || !user) {
      throw new AppException('USER_NOT_FOUND');
    }
    return user;
  }
}
