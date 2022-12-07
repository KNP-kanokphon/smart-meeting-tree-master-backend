import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { userparty, Prisma } from '@prisma/client';

@Injectable()
export class UserpartyRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userparty.findMany();
  }
  async create(
    data: Prisma.userpartyCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userparty.createMany({ data });
  }
  async findUser(userid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userparty.findMany({
      where: {
        iduser: userid,
      },
    });
  }
  // async update(userid: string, option?: { prisma?: TQueryClient }) {
  //   const prisma = option?.prisma ?? this.prisma;
  //   return prisma.userparty.findMany({
  //     where: {
  //       iduser: userid,
  //     },
  //   });
  // }
}
