import { Injectable } from '@nestjs/common';
import { UserDto } from '../../libs/dto/user.dto';
import { PrismaService } from '../../prisma/services/prisma.service';
import { GetProjectResponseDto } from '../dto/get-project.dto';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';
import { AppException } from '../../libs/exceptions/app.exception';

@Injectable()
export class ProjectsService {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * 프로젝트 목록 조회
   */
  async getProjects({ id: userId }: UserDto): Promise<GetProjectResponseDto[]> {
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

  /**
   * 프로젝트 조회
   */
  async getProject(
    { id: userId }: UserDto,
    projectId: string,
  ): Promise<GetProjectResponseDto> {
    const project = await this.prismaService.projects.findUnique({
      where: { id: projectId, userId },
    });

    if (!project) {
      throw new AppException('PROJECT_NOT_FOUND');
    }
    return project;
  }

  /**
   * 프로젝트 업데이트
   */
  async updateProject(
    { id: userId }: UserDto,
    projectId: string,
    { name }: UpdateProjectDto,
  ): Promise<boolean> {
    const project = await this.prismaService.projects.findUnique({
      where: { id: projectId },
      select: { userId: true },
    });

    if (project?.userId !== userId) {
      throw new AppException('PROJECT_NOT_FOUND');
    }

    await this.prismaService.projects.updateMany({
      where: { id: projectId },
      data: { name },
    });
    return true;
  }

  /* Project 권한 조회 */
  async validateProjectPermission(
    userId: string,
    projectId: string,
  ): Promise<void> {
    const project = await this.prismaService.projects.findUnique({
      where: { id: projectId },
      select: { userId: true },
    });
    if (project?.userId !== userId) {
      throw new AppException('FORBIDDEN');
    }
  }
}
