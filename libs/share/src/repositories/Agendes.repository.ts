import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { agendes, Prisma } from '@prisma/client';

@Injectable()
export class AgendesRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.agendes.findMany();
  }
  async findByid(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.agendes.findMany({
      where: {
        uuid: roomid,
      },
    });
  }
  async create(
    data: Prisma.agendesCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.agendes.create({ data });
  }
  async findAgendaByid(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.agendes.findMany({
      where: {
        uuid: roomid,
      },
    });
  }
  async deletebyidmeeting(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.agendes.deleteMany({
      where: {
        uuid: roomid,
      },
    });
  }
  async createmany(
    data: Prisma.userCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.agendes.createMany({
      data,
    });
  }
}
