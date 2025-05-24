import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { ScenesService } from '../../scenes/services/scenes.service';
import { UserDto } from '../../libs/dto/user.dto';
import { CreateObjectDto } from '../dto/create-object.dto';
import { GetObjectDto, GetObjectResponseDto } from '../dto/get-object.dto';
import { CacheService } from '../../cache/services/cache.service';

@Injectable()
export class ObjectsService {
  constructor(
    private readonly cacheService: CacheService,
    private readonly prismaService: PrismaService,
    private readonly scenesService: ScenesService,
  ) {}

  /**
   * Object 목록 조회
   */
  async getObjects(
    { id: userId }: UserDto,
    sceneId: string,
    { sequence }: GetObjectDto,
  ): Promise<GetObjectResponseDto[]> {
    await this.scenesService.validateScenePermission(userId, sceneId);

    const key = `scene:${sceneId}:latest`;

    if (sequence) {
      const lastSequence = await this.cacheService.get(key);

      if (Number(lastSequence) === sequence) {
        return [];
      }
    }

    return this.prismaService.objects.findMany({
      where: { sceneId },
      orderBy: { sequence: 'desc' },
      skip: sequence ? 1 : 0,
      ...(sequence && {
        cursor: { sceneId_sequence: { sceneId, sequence } },
      }),
      take: 100,
    });
  }

  /**
   * Object 생성
   */
  async createObject(
    { id: userId }: UserDto,
    sceneId: string,
    { type }: CreateObjectDto,
  ): Promise<boolean> {
    await this.scenesService.validateScenePermission(userId, sceneId);

    const sequence = Date.now();

    await this.prismaService.objects.create({
      data: { sceneId, sequence, type },
      select: { sequence: true },
    });

    await this.cacheService.set(`scene:${sceneId}:latest`, sequence, 3600);

    return true;
  }
}
