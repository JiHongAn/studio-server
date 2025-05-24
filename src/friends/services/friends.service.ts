import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}
}
