import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { GetUser } from '../../libs/decorators/user.decorator';
import { UserDto } from '../../libs/dto/user.dto';
import { RefreshDto } from '../dto/refresh.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() params: LoginDto) {
    return this.authService.login(params);
  }

  @Post('register')
  async register(@Body() params: RegisterDto): Promise<boolean> {
    return this.authService.register(params);
  }

  @Post('refresh')
  async refresh(@Body() params: RefreshDto) {
    return this.authService.refresh(params);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@GetUser() user: UserDto): Promise<boolean> {
    return this.authService.logout(user);
  }
}
