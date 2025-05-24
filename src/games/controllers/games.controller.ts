import { Controller } from '@nestjs/common';
import { GamesService } from '../services/games.service';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
}
