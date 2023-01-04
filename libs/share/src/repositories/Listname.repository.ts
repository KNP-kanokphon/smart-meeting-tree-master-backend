import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { listname, Prisma } from '@prisma/client';

@Injectable()
export class ListnameRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.listname.findMany();
  }
  async create(
    data: Prisma.listnameCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.listname.create({ data });
  }
  async createMany(
    data: Prisma.listnameCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.listname.createMany({ data });
  }
  async getuserAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.listname.findMany();
  }

  async updateUserbyID(
    data: any,
    userid: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.listname.updateMany({
      where: {
        uuid: userid,
      },
      data: {
        username: data.username,
        phone: data.phone,
        group: data.group,
        course: data.course,
        position: data.position,
        positionkpi: data.positionkpi,
        address: data.address,
        email: data.email,
      },
    });
  }
  async findUser(userid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.listname.findMany({
      where: {
        uuid: userid,
      },
    });
  }
}
