import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UserDto } from '../../libs/dto/user.dto';
import { RefreshDto, RefreshResponseDto } from '../dto/refresh.dto';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto, LoginResponseDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AppException } from '../../libs/exceptions/app.exception';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 로그인
   */
  async login({ email, password }: LoginDto): Promise<LoginResponseDto> {
    const user = await this.prismaService.users.findUnique({
      where: { email },
      select: { id: true, password: true },
    });
    if (!user) {
      throw new AppException('USER_NOT_FOUND');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppException('INVALID_CREDENTIALS');
    }

    const payload: UserDto = {
      id: user.id,
    };
    const accessToken = this.jwtService.sign(payload, {
      algorithm: 'RS256',
      expiresIn: '15m',
    });
    const refreshToken = this.jwtService.sign(payload, {
      algorithm: 'RS256',
      expiresIn: '7d',
    });

    await this.prismaService.users.updateMany({
      where: { id: user.id },
      data: { refreshToken },
    });
    return { accessToken, refreshToken };
  }

  /**
   * 회원 가입
   */
  async register({ email, password, nickname }: RegisterDto): Promise<boolean> {
    const existingUser = await this.prismaService.users.findUnique({
      where: { email },
      select: { id: true },
    });
    if (existingUser) {
      throw new AppException('EMAIL_ALREADY_EXIST');
    }

    const hash = await bcrypt.hash(password, 10);
    await this.prismaService.users.createMany({
      data: { email, password: hash, nickname },
    });
    return true;
  }

  /**
   * 토큰 갱신
   */
  async refresh({ refreshToken }: RefreshDto): Promise<RefreshResponseDto> {
    const payload = this.jwtService.verify<UserDto>(refreshToken, {
      algorithms: ['RS256'],
    });

    const user = await this.prismaService.users.findUnique({
      where: { id: payload.id },
      select: { id: true, refreshToken: true },
    });

    if (!user || user.refreshToken !== refreshToken) {
      throw new AppException('INVALID_REFRESH_TOKEN');
    }

    const newPayload: UserDto = { id: user.id };
    const newAccessToken = this.jwtService.sign(newPayload, {
      algorithm: 'RS256',
      expiresIn: '15m',
    });
    const newRefreshToken = this.jwtService.sign(newPayload, {
      algorithm: 'RS256',
      expiresIn: '7d',
    });

    await this.prismaService.users.updateMany({
      where: { id: user.id },
      data: { refreshToken: newRefreshToken },
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  /**
   * 로그아웃
   */
  async logout({ id }: UserDto): Promise<boolean> {
    await this.prismaService.users.updateMany({
      where: { id },
      data: { refreshToken: null },
    });
    return true;
  }
}
