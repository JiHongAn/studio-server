import { Module } from '@nestjs/common';
import { GamesService } from './services/games.service';
import { GamesController } from './controllers/games.controller';

@Module({
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
