import { Global, Module } from '@nestjs/common';
import { CacheService } from './services/cache.service';
import { RedisModule } from '@nestjs-modules/ioredis';

@Global()
@Module({
  imports: [
    RedisModule.forRoot(
      {
        type: 'single',
        url: `redis://${process.env.REDIS_WRITER_HOST || process.env.REDIS_HOST}:${process.env.REDIS_WRITER_PORT || process.env.REDIS_PORT}`,
        options: {
          keyPrefix: 'writer:',
          maxRetriesPerRequest: 3,
        },
      },
      'redis-writer',
    ),

    RedisModule.forRoot(
      {
        type: 'single',
        url: `redis://${process.env.REDIS_READER_HOST || process.env.REDIS_HOST}:${process.env.REDIS_READER_PORT || process.env.REDIS_PORT}`,
        options: {
          keyPrefix: 'reader:',
          maxRetriesPerRequest: 3,
          readOnly: true,
        },
      },
      'redis-reader',
    ),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
