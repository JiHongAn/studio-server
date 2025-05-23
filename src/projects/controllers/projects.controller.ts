import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { GetUser } from '../../libs/decorators/user.decorator';
import { UserDto } from '../../libs/dto/user.dto';
import { GetProjectDto } from '../dto/get-project.dto';

@Controller('api/projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async getProjects(@GetUser() user: UserDto): Promise<GetProjectDto[]> {
    return this.projectsService.getProjects(user);
  }
}
