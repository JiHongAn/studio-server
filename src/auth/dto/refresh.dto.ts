import { LoginResponseDto } from './login.dto';
import { IsString } from 'class-validator';

export class RefreshDto {
  @IsString()
  refreshToken: string;
}

export class RefreshResponseDto extends LoginResponseDto {}
