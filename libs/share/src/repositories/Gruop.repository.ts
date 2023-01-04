import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { group, Prisma } from '@prisma/client';

@Injectable()
export class GroupRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.group.findMany();
  }
  //   async findByid(uuid: string, option?: { prisma?: TQueryClient }) {
  //     const prisma = option?.prisma ?? this.prisma;
  //     return prisma.group.findMany({
  //       where: {
  //         uuid: uuid,
  //       },
  //     });
  //   }

  async update(uuid: string, data: any, option?: { prisma?: TQueryClient }) {
    console.log(data);

    const prisma = option?.prisma ?? this.prisma;
    return prisma.group.updateMany({
      where: {
        uuidgroup: uuid,
      },
      data: { namegroup: data.namegroup },
    });
  }
  async deletegroup(uuid: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.group.deleteMany({
      where: {
        uuidgroup: uuid,
      },
    });
  }
  async create(data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.group.create({ data });
  }
}
