import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { GetUser } from '../../libs/decorators/user.decorator';
import { UserDto } from '../../libs/dto/user.dto';
import { GetProjectResponseDto } from '../dto/get-project.dto';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(
    @GetUser() user: UserDto,
  ): Promise<GetProjectResponseDto[]> {
    return this.projectsService.getProjects(user);
  }

  @Post()
  async createProject(
    @GetUser() user: UserDto,
    @Body() params: CreateProjectDto,
  ): Promise<string> {
    return this.projectsService.createProject(user, params);
  }

  @Get(':id')
  async getProject(
    @GetUser() user: UserDto,
    @Param('id') projectId: string,
  ): Promise<GetProjectResponseDto> {
    return this.projectsService.getProject(user, projectId);
  }

  @Patch(':id')
  async updateProject(
    @GetUser() user: UserDto,
    @Param('id') projectId: string,
    @Body() params: UpdateProjectDto,
  ): Promise<boolean> {
    return this.projectsService.updateProject(user, projectId, params);
  }
}
