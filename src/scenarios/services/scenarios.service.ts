import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class ScenariosService {
  constructor(private readonly prismaService: PrismaService) {}
}
