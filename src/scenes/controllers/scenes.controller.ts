import { Controller, Get, Post, UseGuards, Param, Body } from '@nestjs/common';
import { ScenesService } from '../services/scenes.service';
import { GetUser } from '../../libs/decorators/user.decorator';
import { UserDto } from '../../libs/dto/user.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { CreateSceneDto } from '../dto/create-scene.dto';
import { GetSceneResponseDto } from '../dto/get-scene.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/:matchId/scenes')
export class ScenesController {
  constructor(private readonly scenesService: ScenesService) {}

  @Get()
  async getScenes(
    @GetUser() user: UserDto,
    @Param('projectId') projectId: string,
  ): Promise<GetSceneResponseDto[]> {
    return this.scenesService.getScenes(user, projectId);
  }

  @Post()
  async createScene(
    @GetUser() user: UserDto,
    @Param('projectId') projectId: string,
    @Body() params: CreateSceneDto,
  ): Promise<string> {
    return this.scenesService.createScene(user, projectId, params);
  }

  @Get(':sceneId/pull')
  async pullScene(
    @GetUser() user: UserDto,
    @Param('sceneId') sceneId: string,
  ): Promise<void> {
    return this.scenesService.pullScene(user, sceneId);
  }

  @Post(':sceneId/push')
  async pushScene(
    @GetUser() user: UserDto,
    @Param('sceneId') sceneId: string,
  ): Promise<void> {
    return this.scenesService.pushScene(user, sceneId);
  }
}
