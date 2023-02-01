import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { activityuserlog, Prisma } from '@prisma/client';

@Injectable()
export class ActivityuserlogRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activityuserlog.findMany();
  }
  async create(
    data: Prisma.activityuserlogCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activityuserlog.create({ data });
  }
}
