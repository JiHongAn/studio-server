import { Injectable } from '@nestjs/common';
import { UserDto } from '../../libs/dto/user.dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { GetProjectDto } from '../dto/get-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 프로젝트 목록 조회
   */
  async getProjects({ id: userId }: UserDto): Promise<GetProjectDto[]> {
    return this.prismaService.projects.findMany({
      where: { userId },
    });
  }
}
