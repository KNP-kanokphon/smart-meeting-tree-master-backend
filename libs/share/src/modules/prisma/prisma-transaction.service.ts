import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TQueryClient } from './types';

@Injectable()
export class PrismaTransactionService {
  constructor(private db: PrismaService) {}

  async execute<T>(
    func: (prisma?: TQueryClient) => Promise<T>,
    option?: { prisma?: TQueryClient },
  ) {
    const result = await this.db.$transaction(
      (prisma) => func(option?.prisma ?? prisma),
      { maxWait: 60 * 1000, timeout: 60 * 1000 * 15 },
    );
    return result as T;
  }
}
