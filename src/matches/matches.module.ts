import { Module } from '@nestjs/common';
import { MatchesService } from './services/matches.service';
import { MatchesController } from './controllers/matches.controller';

@Module({
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
