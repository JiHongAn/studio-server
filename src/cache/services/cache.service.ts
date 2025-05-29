import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(
    @InjectRedis('redis-writer') private readonly writerRedis: Redis,
    @InjectRedis('redis-reader') private readonly readerRedis: Redis,
  ) {}

  // 읽기 작업
  async get(key: string) {
    return this.readerRedis.get(key);
  }

  // 쓰기 작업
  async set(key: string, value: string | number, ttl: number): Promise<'OK'> {
    return this.writerRedis.set(key, value, 'EX', ttl);
  }

  // 삭제 작업 (쓰기)
  async del(key: string): Promise<number> {
    return this.writerRedis.del(key);
  }

  // 배치 읽기 작업
  async mget(keys: string[]): Promise<(string | null)[]> {
    return this.readerRedis.mget(...keys);
  }

  // 배치 쓰기 작업
  async mset(keyValues: Record<string, string | number>): Promise<'OK'> {
    const pipeline = this.writerRedis.pipeline();
    Object.entries(keyValues).forEach(([key, value]) => {
      pipeline.set(key, value);
    });
    await pipeline.exec();
    return 'OK';
  }

  // 키 존재 확인 (읽기)
  async exists(key: string): Promise<number> {
    return this.readerRedis.exists(key);
  }

  // TTL 확인 (읽기)
  async ttl(key: string): Promise<number> {
    return this.readerRedis.ttl(key);
  }

  // 패턴으로 키 검색 (읽기)
  async keys(pattern: string): Promise<string[]> {
    return this.readerRedis.keys(pattern);
  }

  // Writer Redis 인스턴스 직접 접근
  get writer(): Redis {
    return this.writerRedis;
  }

  // Reader Redis 인스턴스 직접 접근
  get reader(): Redis {
    return this.readerRedis;
  }
}
