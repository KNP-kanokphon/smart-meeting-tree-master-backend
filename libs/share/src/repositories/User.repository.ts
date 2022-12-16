import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { user, Prisma } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.user.findMany();
  }
  async create(
    data: Prisma.userCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.user.create({ data });
  }
  async importuser(
    data: Prisma.userCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.user.createMany({ data });
  }
  findById(
    data: Prisma.userCreateManyInput,
    userid: string,
    option?: {
      prisma?: TQueryClient;
    },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.user.findMany({
      where: {
        uuid: userid,
      },
    });
  }
  async deleteUser(uuid: any, option?: { prisma?: TQueryClient }) {
    console.log(uuid);
    const prisma = option?.prisma ?? this.prisma;
    return prisma.user.deleteMany({
      where: {
        uuid: uuid,
      },
    });
  }
  async updateUser(uuid: any, data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.user.updateMany({
      where: {
        uuid: uuid,
      },
      data: data,
    });
  }
}
