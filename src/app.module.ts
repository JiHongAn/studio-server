import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [PrismaModule, CacheModule],
  controllers: [AppController],
})
export class AppModule {}
