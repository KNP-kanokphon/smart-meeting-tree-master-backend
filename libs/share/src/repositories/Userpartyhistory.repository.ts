import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { userpartyhistory, Prisma } from '@prisma/client';

@Injectable()
export class UserpartyhistoryRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userpartyhistory.findMany();
  }
  async create(
    data: Prisma.userpartyhistoryCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userpartyhistory.create({ data });
  }
  async findUser(userid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userpartyhistory.findMany({
      where: {
        iduser: userid,
        checkin: true,
      },
    });
  }
  async update(userid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userpartyhistory.updateMany({
      where: {
        iduser: userid,
      },
      data: {
        recivegift: true,
      },
    });
  }
}
