import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { file, Prisma } from '@prisma/client';

@Injectable()
export class FileRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.file.findMany();
  }
  //   async findByid(roomid: string, option?: { prisma?: TQueryClient }) {
  //     const prisma = option?.prisma ?? this.prisma;
  //     return prisma.file.findMany({
  //       where: {
  //         uuid: roomid,
  //       },
  //     });
  //   }
  async create(
    idmeeting: string,
    filename: string,
    path: string,
    type: string,
    step: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    const data = {
      idmeeting: idmeeting,
      namefile: filename,
      pathfile: path,
      type: type,
      step: step,
    };
    return prisma.file.create({ data });
  }
  async getFileByid(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.file.findMany({
      where: {
        idmeeting: roomid,
      },
    });
  }
}
