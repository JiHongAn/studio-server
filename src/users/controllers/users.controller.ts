import { Controller, UseGuards } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
}
