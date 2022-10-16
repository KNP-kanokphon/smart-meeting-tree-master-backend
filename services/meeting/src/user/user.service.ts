import { Injectable } from '@nestjs/common';
import {
  AppError,
  UserRepository,
  UserattendeesRepository,
} from '@d-debt/share';
import { Prisma } from '@prisma/client';

// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  findAll() {
    return this.userRepo.findAll();
  }
  async create(data: Prisma.userCreateManyInput) {
    return this.userRepo.create(data);
  }
}
@Injectable()
export class UserattendeesService {
  constructor(private userattendeesRepo: UserattendeesRepository) {}

  findAll() {
    return this.userRepo.findAll();
  }
  async create(data: Prisma.userattendeesCreateManyInput) {
    return this.userattendeesRepo.create(data);
  }
  async createMany(data: Prisma.userattendeesCreateManyInput) {
    return this.userattendeesRepo.createMany(data);
  }
  async findbyid(roomid: string, userid: string) {
    return await this.userattendeesRepo.findbyid(roomid, userid);
  }
  async update(roomid: string, userid: string, status: boolean) {
    return await this.userattendeesRepo.update(roomid, userid, status);
  }
}
