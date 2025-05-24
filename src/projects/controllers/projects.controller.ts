import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { GetUser } from '../../libs/decorators/user.decorator';
import { UserDto } from '../../libs/dto/user.dto';
import { GetProjectDto } from '../dto/get-project.dto';
import { CreateProjectDto } from '../dto/create-project.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(@GetUser() user: UserDto): Promise<GetProjectDto[]> {
    return this.projectsService.getProjects(user);
  }

  @Post()
  async createProject(
    @GetUser() user: UserDto,
    @Body() params: CreateProjectDto,
  ): Promise<string> {
    return this.projectsService.createProject(user, params);
  }
}
