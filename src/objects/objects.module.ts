import { Module } from '@nestjs/common';
import { ObjectsService } from './services/objects.service';
import { ObjectsController } from './controllers/objects.controller';
import { ScenesModule } from '../scenes/scenes.module';

@Module({
  imports: [ScenesModule],
  controllers: [ObjectsController],
  providers: [ObjectsService],
})
export class ObjectsModule {}
