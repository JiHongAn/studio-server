import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      privateKey: process.env.PRIVATE_JWT_KEY
        ? Buffer.from(process.env.PRIVATE_JWT_KEY, 'base64').toString('ascii')
        : undefined,
      signOptions: {
        algorithm: 'RS256',
        expiresIn: '15m',
      },
    }),
  ],
  providers: [JwtStrategy, AuthService, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
