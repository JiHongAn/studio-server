import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UserDto } from '../../libs/dto/user.dto';
import { CreateSceneDto } from '../dto/create-scene.dto';
import { CacheService } from '../../cache/services/cache.service';
import { AppException } from '../../libs/exceptions/app.exception';
import { GetSceneResponseDto } from '../dto/get-scene.dto';
import { MatchesService } from '../../matches/services/matches.service';

@Injectable()
export class ScenesService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly prismaService: PrismaService,
    private readonly matchesService: MatchesService,
  ) {}

  /**
   * 시나리오 조회
   */
  async getScenes(
    { id: userId }: UserDto,
    matchId: string,
  ): Promise<GetSceneResponseDto[]> {
    await this.matchesService.validateMatchPermission(userId, matchId);

    return this.prismaService.reader.scenes.findMany({
      where: { matchId },
    });
  }

  /**
   * 시나리오 생성
   */
  async createScene(
    { id: userId }: UserDto,
    matchId: string,
    { name }: CreateSceneDto,
  ): Promise<string> {
    await this.matchesService.validateMatchPermission(userId, matchId);

    const scene = await this.prismaService.writer.scenes.create({
      data: { matchId, name },
      select: { id: true },
    });
    return scene.id;
  }

  /* 유저 권한 체크 */
  async validateScenePermission(
    userId: string,
    sceneId: string,
  ): Promise<void> {
    const key = `scene:${sceneId}`;

    const cachedScenarioUserId = await this.cacheService.get(key);
    if (cachedScenarioUserId === userId) {
      return;
    }

    const scene = await this.prismaService.reader.scenes.findUnique({
      where: { id: sceneId },
      select: { matchId: true },
    });
    if (!scene) {
      throw new AppException('FORBIDDEN');
    }

    const match = await this.prismaService.reader.matches.findUnique({
      where: { id: scene.matchId },
      select: { projectId: true },
    });
    if (!match) {
      throw new AppException('FORBIDDEN');
    }

    const project = await this.prismaService.reader.projects.findUnique({
      where: { id: match.projectId },
      select: { userId: true },
    });
    if (!project || project.userId !== userId) {
      throw new AppException('FORBIDDEN');
    }

    await this.cacheService.set(key, userId, 3600);
  }
}
