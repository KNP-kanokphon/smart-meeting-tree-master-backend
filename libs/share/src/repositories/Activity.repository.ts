import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { activity, Prisma } from '@prisma/client';

@Injectable()
export class ActivityRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activity.findMany();
  }
  async findbyid(idactivity: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activity.findMany({
      where: {
        idactivity: idactivity,
      },
      orderBy: {
        applicationnumber: 'asc',
      },
    });
  }
  async create(
    data: Prisma.activityCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activity.createMany({
      data,
      skipDuplicates: true,
    });
  }
  async update(
    data: Prisma.activityCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activity.updateMany({
      where: {
        idactivity: data.idactivity,
        applicationnumber: data.applicationnumber,
      },
      data,
    });
  }
  async delete(idactivity: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activity.deleteMany({
      where: {
        idactivity: idactivity,
        sendsmsstatus: false,
      },
    });
  }
  async updatestatussms(
    data: Prisma.activityCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.activity.updateMany({
      where: {
        idactivity: data.idactivity,
        applicationnumber: data.applicationnumber,
      },
      data: {
        sendsmsstatus: true,
      },
    });
  }
}
