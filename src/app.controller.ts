import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): { uptime: number } {
    return { uptime: process.uptime() };
  }
}
