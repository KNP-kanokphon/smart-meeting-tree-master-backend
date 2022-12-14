import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { meetings, Prisma } from '@prisma/client';

@Injectable()
export class MeetingRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.meetings.findMany();
  }
  async findByid(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.meetings.findMany({
      where: {
        uuid: roomid,
      },
    });
  }
  async create(
    data: Prisma.meetingsCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.meetings.create({ data });
  }
  async updateSummary(
    roomid: string,
    datasummary: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.meetings.updateMany({
      where: {
        uuid: roomid,
      },
      data: {
        summarymeeting: datasummary,
        summarychecklist: true,
      },
    });
  }
  async update(roomid: string, data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.meetings.updateMany({
      where: {
        uuid: roomid,
      },
      data,
    });
  }
}
