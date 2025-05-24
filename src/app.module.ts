import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { MatchesModule } from './matches/matches.module';
import { ScenesModule } from './scenes/scenes.module';

@Module({
  imports: [
    PrismaModule,
    CacheModule,
    AuthModule,
    ProjectsModule,
    UsersModule,
    MatchesModule,
    ScenesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
