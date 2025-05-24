import { Module } from '@nestjs/common';
import { ScenariosService } from './services/scenarios.service';
import { ScenariosController } from './controllers/scenarios.controller';

@Module({
  controllers: [ScenariosController],
  providers: [ScenariosService],
})
export class ScenariosModule {}
