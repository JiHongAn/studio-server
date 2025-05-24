import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [PrismaModule, CacheModule, AuthModule, ProjectsModule, UsersModule, FriendsModule],
  controllers: [AppController],
})
export class AppModule {}
