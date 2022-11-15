import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { userattendees, Prisma } from '@prisma/client';

@Injectable()
export class UserattendeesRepository {
  constructor(private prisma: PrismaService) {}

  // async findAll(option?: { prisma?: TQueryClient }) {
  //   const prisma = option?.prisma ?? this.prisma;
  //   return prisma.userattendees.findMany();
  // }
  async createMany(
    data: Prisma.userattendeesCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.createMany({ data });
  }
  async create(
    data: Prisma.userattendeesCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.create({ data });
  }
  async findbyid(
    roomid: string,
    userid: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.findMany({
      where: {
        idmeeting: roomid,
        uuidprofile: userid,
      },
    });
  }
  async update(
    roomid: string,
    userid: string,
    status: boolean,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.updateMany({
      where: {
        idmeeting: roomid,
        uuidprofile: userid,
      },
      data: {
        checkin: status,
      },
    });
  }
  async findUserInroom(roomid: string, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.findMany({
      where: {
        idmeeting: roomid,
      },
    });
  }
  async getUserInroomAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.findMany();
  }
  async updateStatusUser(
    idmeeting: string,
    iduser: string,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    console.log(idmeeting);
    console.log(iduser);

    return prisma.userattendees.updateMany({
      where: {
        uuidprofile: iduser,
        idmeeting: idmeeting,
      },
      data: {
        confirm: true,
      },
    });
  }

  async updatefoodUser(
    idmeeting: any,
    iduser: any,
    statusFood: boolean,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.updateMany({
      where: {
        uuidprofile: iduser,
        idmeeting: idmeeting,
      },
      data: {
        foodstatus: statusFood,
      },
    });
  }

  async updateUserDetail(
    idmeeting: any,
    iduser: any,
    data: any,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.userattendees.updateMany({
      where: {
        uuidprofile: iduser,
        idmeeting: idmeeting,
      },
      data: {
        signature: data.signature,
      },
    });
  }
  // async updateUserbyID(
  //   data: any,
  //   userid: string,
  //   option?: { prisma?: TQueryClient },
  // ) {
  //   const prisma = option?.prisma ?? this.prisma;
  //   console.log(data);
  //   // console.log(userid);

  //   return prisma.userattendees.updateMany({
  //     where: {
  //       uuid: userid,
  //     },
  //     data: {
  //       username: data,
  //     },
  //   });
  //   // return prisma.userattendees.findMany({
  //   //   where: {
  //   //     idmeeting: roomid,
  //   //   },
  //   // });
  // }
}
