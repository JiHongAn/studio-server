import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly writerClient: PrismaClient;
  private readonly readerClient: PrismaClient;

  constructor() {
    this.writerClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_WRITER_URL || process.env.DATABASE_URL,
        },
      },
    });

    this.readerClient = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_READER_URL || process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() {
    await this.writerClient.$connect();
    await this.readerClient.$connect();
  }

  async onModuleDestroy() {
    await this.writerClient.$disconnect();
    await this.readerClient.$disconnect();
  }

  get writer(): PrismaClient {
    return this.writerClient;
  }

  get reader(): PrismaClient {
    return this.readerClient;
  }
}
