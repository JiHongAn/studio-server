import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from '../../libs/dto/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    if (!process.env.PUBLIC_JWT_KEY) {
      throw new Error('PUBLIC_JWT_KEY is not defined');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Buffer.from(process.env.PUBLIC_JWT_KEY, 'base64').toString('ascii'),
      algorithms: ['RS256'],
    });
  }

  validate(payload: UserDto): UserDto {
    return payload;
  }
}
