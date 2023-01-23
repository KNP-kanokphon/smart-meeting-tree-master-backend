import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { votehistory, Prisma } from '@prisma/client';

@Injectable()
export class VotehistoryRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.votehistory.findMany();
  }
  async create(data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.votehistory.create({ data });
  }

  async findbyid(
    roomid: string,
    userid: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.votehistory.findMany({
      where: {
        roomid: roomid,
        userid: userid,
      },
    });
  }
}
