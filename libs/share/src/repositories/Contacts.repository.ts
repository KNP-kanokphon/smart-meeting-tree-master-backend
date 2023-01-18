import { PrismaService } from '../modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TQueryClient } from '../modules/prisma/types';
import { contacts, Prisma } from '@prisma/client';

@Injectable()
export class ContactRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contacts.findMany();
  }
  async create(
    data: Prisma.contactsCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contacts.create({ data });
  }
  async importuser(
    data: Prisma.contactsCreateManyInput,
    option?: { prisma?: TQueryClient },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contacts.createMany({ data });
  }
  findById(
    userid: string,
    option?: {
      prisma?: TQueryClient;
    },
  ) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contacts.findMany({
      where: {
        uuid: userid,
      },
    });
  }
  async deleteUser(uuid: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contacts.deleteMany({
      where: {
        uuid: uuid,
      },
    });
  }
  async updateUser(uuid: any, data: any, option?: { prisma?: TQueryClient }) {
    const prisma = option?.prisma ?? this.prisma;
    return prisma.contacts.updateMany({
      where: {
        uuid: uuid,
      },
      data: data,
    });
  }
}
