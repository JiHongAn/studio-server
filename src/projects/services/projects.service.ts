import { Injectable } from '@nestjs/common';
import { UserDto } from '../../libs/dto/user.dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { GetProjectDto } from '../dto/get-project.dto';
import { CreateProjectDto } from '../dto/create-project.dto';

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

  /**
   * 프로젝트 생성
   */
  async createProject(
    { id: userId }: UserDto,
    { name }: CreateProjectDto,
  ): Promise<string> {
    const { id: projectId } = await this.prismaService.projects.create({
      data: { userId, name },
      select: { id: true },
    });
    return projectId;
  }
}
