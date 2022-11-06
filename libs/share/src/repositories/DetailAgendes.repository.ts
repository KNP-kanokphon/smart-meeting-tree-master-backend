import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { detailAgendes, Prisma } from '@prisma/client';

@Injectable()
export class DetailAgendesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.detailAgendes.findMany();
  }
  async findByid(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.detailAgendes.findMany({
      where: {
        idmeeting: roomid,
      },
    });
  }
  async create(data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.detailAgendes.create({ data });
  }
}
