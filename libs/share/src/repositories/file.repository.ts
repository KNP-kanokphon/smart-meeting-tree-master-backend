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
  async create(
    idmeeting: string,
    filename: string,
    path: string,
    type: string,
    step: string,
    idfile: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    const data = {
      idmeeting: idmeeting,
      namefile: filename,
      pathfile: path,
      type: type,
      step: step,
      idfile: idfile,
    };
    return prisma.files.create({ data });
  }
  async deleteFileByid(
    idmeeting: string,
    idfile: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.files.deleteMany({
      where: { idmeeting: idmeeting, idfile: idfile },
    });
  }
  async deleteFileAgendesByid(
    idmeeting: string,
    idfile: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    const type = 'fileAgenda';
    return prisma.files.deleteMany({
      where: { idmeeting: idmeeting, idfile: idfile, type: type },
    });
  }
  async getFileByid(
    roomid: string,
    filename: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.files.findMany({
      where: {
        idmeeting: roomid,
        namefile: filename,
        type: 'fileOverviwe',
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
  delete(roomid: string, type: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.files.deleteMany({
      where: {
        idmeeting: roomid,
        type,
      },
    });
  }
  deleteoverviwe(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    const type = 'fileOverviwe';
    return prisma.files.deleteMany({
      where: {
        idmeeting: roomid,
        type,
      },
    });
  }
  deleteagendes(
    roomid: string,
    step: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    const type = 'fileAgenda';
    return prisma.files.deleteMany({
      where: {
        idmeeting: roomid,
        step: step,
        type,
      },
    });
  }

  getFileoverview(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    const type = 'fileOverviwe';
    return prisma.files.findMany({
      where: {
        idmeeting: roomid,
        type,
      },
    });
  }
  getFileagendas(
    roomid: string,
    step: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    const type = 'fileAgenda';
    return prisma.files.findMany({
      where: {
        idmeeting: roomid,
        step: step,
        type,
      },
    });
  }
}
