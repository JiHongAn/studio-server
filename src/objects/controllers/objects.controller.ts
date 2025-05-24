import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ObjectsService } from '../services/objects.service';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';
import { GetUser } from '../../libs/decorators/user.decorator';
import { UserDto } from '../../libs/dto/user.dto';
import { CreateObjectDto } from '../dto/create-object.dto';
import { GetObjectDto, GetObjectResponseDto } from '../dto/get-object.dto';

@UseGuards(JwtAuthGuard)
@Controller('api/scenes/:sceneId/objects')
export class ObjectsController {
  constructor(private readonly objectsService: ObjectsService) {}

  @Get()
  async getObjects(
    @GetUser() user: UserDto,
    @Param('sceneId') sceneId: string,
    @Query() params: GetObjectDto,
  ): Promise<GetObjectResponseDto[]> {
    return this.objectsService.getObjects(user, sceneId, params);
  }

  @Post()
  async createObjects(
    @GetUser() user: UserDto,
    @Param('sceneId') sceneId: string,
    @Body() params: CreateObjectDto,
  ): Promise<boolean> {
    return this.objectsService.createObject(user, sceneId, params);
  }
}
