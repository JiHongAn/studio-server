import { Controller } from '@nestjs/common';
import { ScenariosService } from '../services/scenarios.service';

@Controller('scenarios')
export class ScenariosController {
  constructor(private readonly scenariosService: ScenariosService) {}
}
