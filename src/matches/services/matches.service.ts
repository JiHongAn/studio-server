import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { AppException } from '../../libs/exceptions/app.exception';
import { UserDto } from '../../libs/dto/user.dto';
import { ProjectsService } from '../../projects/services/projects.service';
import { CreateMatchDto } from '../dto/create-match.dto';
import { GetMatchResponseDto } from '../dto/get-match.dto';

@Injectable()
export class MatchesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly projectsService: ProjectsService,
  ) {}

  /**
   * 매치 조회
   */
  async getMatches(
    { id: userId }: UserDto,
    projectId: string,
  ): Promise<GetMatchResponseDto[]> {
    await this.projectsService.validateProjectPermission(userId, projectId);

    return this.prismaService.matches.findMany({
      where: { projectId },
    });
  }

  /**
   * 매치 생성
   */
  async createMatch(
    { id: userId }: UserDto,
    projectId: string,
    { name }: CreateMatchDto,
  ): Promise<string> {
    await this.projectsService.validateProjectPermission(userId, projectId);

    const match = await this.prismaService.matches.create({
      data: { projectId, name },
      select: { id: true },
    });
    return match.id;
  }

  /* Match 권한 조회 */
  async validateMatchPermission(
    userId: string,
    matchId: string,
  ): Promise<void> {
    const match = await this.prismaService.matches.findUnique({
      where: { id: matchId },
      select: { projectId: true },
    });
    if (!match) {
      throw new AppException('FORBIDDEN');
    }

    const project = await this.prismaService.projects.findUnique({
      where: { id: match.projectId },
      select: { userId: true },
    });
    if (project?.userId !== userId) {
      throw new AppException('FORBIDDEN');
    }
  }
}
