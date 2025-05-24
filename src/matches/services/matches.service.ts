import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';
import { AppException } from '../../libs/exceptions/app.exception';

@Injectable()
export class MatchesService {
  constructor(private readonly prismaService: PrismaService) {}

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
