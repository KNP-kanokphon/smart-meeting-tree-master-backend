import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { activityplan, Prisma } from '@prisma/client';

@Injectable()
export class ActivityplanRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activityplan.findMany();
  }
  async create(
    data: Prisma.activityplanCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activityplan.create({ data });
  }
  async findByid(idactivity: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activityplan.findMany({
      where: {
        idactivity: idactivity,
      },
    });
  }
}
