import {
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Body,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ScenesService } from '../services/scenes.service';
import { GetUser } from '../../libs/decorators/user.decorator';
import { UserDto } from '../../libs/dto/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreateSceneDto } from '../dto/create-scene.dto';
import { GetSceneResponseDto } from '../dto/get-scene.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/matches/:matchId/scenes')
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Get()
  async getScenes(
    @GetUser() user: UserDto,
    @Param('matchId') matchId: string,
  ): Promise<GetSceneResponseDto[]> {
    return this.scenesService.getScenes(user, matchId);
  }

  @Post()
  async createScene(
    @GetUser() user: UserDto,
    @Param('matchId') matchId: string,
    @Body() params: CreateSceneDto,
  ): Promise<string> {
    return this.scenesService.createScene(user, matchId, params);
  }
}
