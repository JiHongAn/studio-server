import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';
import { ChatsModule } from './chats/chats.module';
import { MatchesModule } from './matches/matches.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [PrismaModule, CacheModule, AuthModule, ProjectsModule, UsersModule, FriendsModule, ChatsModule, MatchesModule, GamesModule],
  controllers: [AppController],
})
export class AppModule {}
