import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MatchesService } from '../services/matches.service';
import { GetUser } from '../../libs/decorators/user.decorator';
import { UserDto } from '../../libs/dto/user.dto';
import { CreateMatchDto } from '../dto/create-match.dto';
import { GetMatchResponseDto } from '../dto/get-match.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/projects/:projectId/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Get()
  async getMatches(
    @GetUser() user: UserDto,
    @Param(':projectId') projectId: string,
  ): Promise<GetMatchResponseDto[]> {
    return this.matchesService.getMatches(user, projectId);
  }

  @Post()
  async createMatch(
    @GetUser() user: UserDto,
    @Param(':projectId') projectId: string,
    @Body() params: CreateMatchDto,
  ): Promise<string> {
    return this.matchesService.createMatch(user, projectId, params);
  }
}
