import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { files, Prisma } from '@prisma/client';

@Injectable()
export class FileRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.files.findMany();
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
    return prisma.files.create({ data });
  }
  async getFileByid(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.files.findMany({
      where: {
        idmeeting: roomid,
      },
    });
  }
  getPathFilePdf(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.files.findMany({
      where: {
        idmeeting: roomid,
      },
    });
  }
  getfilestep(
    roomid: string,
    step: string,
    namefile: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.files.findMany({
      where: {
        idmeeting: roomid,
        step: step,
        namefile: namefile,
      },
    });
  }
  delete(
    roomid: string,
    step: string,
    namefile: string,
    type: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.files.deleteMany({
      where: {
        idmeeting: roomid,
        step: step,
        namefile: namefile,
        type,
      },
    });
  }
}
