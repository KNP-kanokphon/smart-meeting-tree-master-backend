import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { position, course, Prisma } from '@prisma/client';
import id from 'date-fns/locale/id';
import { async } from 'rxjs';
import { el } from 'date-fns/locale';

@Injectable()
export class PositionRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.position.findMany();
  }
  async create(
    data: Prisma.positionCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.position.create({ data });
  }
  async importPosition(
    data: Prisma.positionCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.position.createMany({ data });
  }

  async deletePosition(uuid: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.position.deleteMany({
      where: {
        uuid: uuid,
      },
    });
  }
  async importcourse(
    data: Prisma.courseCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.course.createMany({ data });
  }
  async findallCourse(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.course.findMany();
  }
  async findbyid(uuid: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    // console.log(uuid);
    if (uuid.length > 0) {
      if (uuid.length > 1) {
        uuid.map(async (x: any) => {
          return await prisma.position.findMany({ where: { uuid: x } });
        });
      } else {
        return await prisma.position.findMany({ where: { uuid: uuid[0] } });
      }
    }

    // return prisma.position.findMany({ where: { uuid: uuid } });
  }
}
