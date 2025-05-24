import { Module } from '@nestjs/common';
import { MatchesService } from './services/matches.service';
import { MatchesController } from './controllers/matches.controller';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [MatchesController],
  providers: [MatchesService],
  exports: [MatchesService],
})
export class MatchesModule {}
