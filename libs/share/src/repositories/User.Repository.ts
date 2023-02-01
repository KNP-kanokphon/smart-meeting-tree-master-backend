import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { userinfo, Prisma } from '@prisma/client';

@Injectable()
export class UserinfoRepository {
  constructor(private prisma: PrismaService) {}
  async create(
    data: Prisma.userinfoCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userinfo.createMany({ data, skipDuplicates: true });
  }

  async findOne(employeeId: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userinfo.findFirst({ where: { employeeId } });
  }
}
