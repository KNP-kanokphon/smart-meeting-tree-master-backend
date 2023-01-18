import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { foodinmeeting, Prisma } from '@prisma/client';

@Injectable()
export class FoodRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.foodinmeeting.findMany();
  }
  async findByid(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.foodinmeeting.findMany({
      where: {
        uuid: roomid,
      },
    });
  }
  async create(data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.foodinmeeting.create({ data });
  }
  async delete(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.foodinmeeting.deleteMany({
      where: {
        uuid: roomid,
      },
    });
  }
}
