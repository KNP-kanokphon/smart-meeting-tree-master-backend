import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { detailagendes, Prisma } from '@prisma/client';

@Injectable()
export class DetailAgendesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.detailagendes.findMany();
  }
  async findByid(
    roomid: string,
    step: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.detailagendes.findMany({
      where: {
        idmeeting: roomid,
        step: step,
      },
      orderBy: [
        {
          step: 'asc',
        },
      ],
    });
  }
  async create(data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.detailagendes.create({ data });
  }
}
