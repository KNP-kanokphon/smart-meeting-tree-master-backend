import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { userattendees, Prisma } from '@prisma/client';

@Injectable()
export class UserattendeesRepository {
  constructor(private prisma: PrismaService) {}

  //   async findAll(option?: { prisma?: TQueryClient }) {
  //     const prisma = option?.prisma ?? this.prisma;
  //     return prisma.userattendees.findMany();
  //   }
  async createMany(
    data: Prisma.userattendeesCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.createMany({ data });
  }
  async create(
    data: Prisma.userattendeesCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.create({ data });
  }
  async findbyid(
    roomid: string,
    userid: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.findMany({
      where: {
        idmeeting: roomid,
        uuid: userid,
      },
    });
  }
  async update(
    roomid: string,
    userid: string,
    status: boolean,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.updateMany({
      where: {
        idmeeting: roomid,
        uuid: userid,
      },
      data: {
        checkin: status,
      },
    });
  }
  async findUserInroom(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.findMany({
      where: {
        idmeeting: roomid,
      },
    });
  }
}
