import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { course, Prisma } from '@prisma/client';

@Injectable()
export class CourseRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.course.findMany();
  }
  async update(data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.course.updateMany({
      where: { uuid: data.uuid },
      data: data,
    });
  }
  async delete(uuid: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.course.deleteMany({
      where: {
        uuid: uuid,
      },
    });
  }
  async create(data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.course.create({ data });
  }
}
