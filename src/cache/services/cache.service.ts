import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(key: string) {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl: number): Promise<'OK'> {
    return this.redis.set(key, value, 'EX', ttl);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }
}
