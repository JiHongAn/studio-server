import { Controller } from '@nestjs/common';
import { MatchesService } from '../services/matches.service';

@Controller('api/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}
}
