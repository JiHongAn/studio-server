import { Module } from '@nestjs/common';
import { ScenesService } from './services/scenes.service';
import { ScenesController } from './controllers/scenes.controller';
import { MatchesModule } from '../matches/matches.module';

@Module({
  imports: [MatchesModule],
  controllers: [ScenesController],
  providers: [ScenesService],
})
export class ScenesModule {}
