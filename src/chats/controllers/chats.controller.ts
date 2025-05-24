import { Controller } from '@nestjs/common';
import { ChatsService } from '../services/chats.service';

@Controller('api/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}
}
