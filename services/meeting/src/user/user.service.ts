import {
  AppError,
  UserRepository,
  UserattendeesRepository,
  ListnameRepository,
  FoodRepository,
  PositionRepository,
} from '@d-debt/share';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { el } from 'date-fns/locale';
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
  constructor(
    private userattendeesRepo: UserattendeesRepository,
    private userRepo: UserRepository,
    private listnameRepo: ListnameRepository,
    private positionRepo: PositionRepository,
  ) {}

  findAll() {
    return this.userRepo.findAll();
  }

  async updateUserbyID(data: any, userid: string) {
    return await this.listnameRepo.updateUserbyID(data, userid);
  }

  async create(data: Prisma.userattendeesCreateManyInput) {
    return this.userattendeesRepo.create(data);
  }

  async createMany(data: any) {
    const id = data['idmeeting'];
    data['userBoard'].map((e) => {
      const data: any = {
        username: e.username,
        uuidprofile: e.uuidprofile,
        uuid: e.uuid,
        idmeeting: id,
        checkin: false,
        confirm: false,
        type: 'userBoard',
        type_user: e.type_user,
        foodstatus: false,
      };
      this.userattendeesRepo.createMany(data);
    });
    data['userAttendee'].map((e) => {
      const data: any = {
        username: e.username,
        uuidprofile: e.uuidprofile,
        uuid: e.uuid,
        idmeeting: id,
        checkin: false,
        confirm: false,
        type: 'userAttendee',
        type_user: e.type_user,
        foodstatus: false,
      };
      this.userattendeesRepo.createMany(data);
    });
  }

  async findbyid(roomid: string, userid: string) {
    return await this.userattendeesRepo.findbyid(roomid, userid);
  }
  async update(roomid: string, userid: string, status: boolean) {
    return await this.userattendeesRepo.update(roomid, userid, status);
  }
  async findUserInroom(roomid: string) {
    return await this.userattendeesRepo.findUserInroom(roomid);
  }
  async getUserInroomAll() {
    return await this.userattendeesRepo.getUserInroomAll();
  }
  async importUser(data: Prisma.listnameCreateManyInput) {
    return await this.listnameRepo.createMany(data);
  }
  async getuserAll() {
    return await this.listnameRepo.getuserAll();
  }
  async updateStatusUser(idmeeting: string, iduser: string) {
    return this.userattendeesRepo.updateStatusUser(idmeeting, iduser);
  }
  async importPosition(data: any, filetype: string) {
    if (filetype === '1') {
      return await this.positionRepo.importPosition(data);
    } else {
      return await this.positionRepo.importcourse(data);
    }
  }
  async getPositionAll() {
    return await this.positionRepo.findAll();
  }
  async getCourseAll() {
    return await this.positionRepo.findallCourse();
  }
  async updateFood(roomid: any, userid: any, status: any) {
    return await this.userattendeesRepo.updateStatusUser(
      roomid,
      userid,
      status,
    );
  }
  async deletePosition(uuid: any) {
    return await this.positionRepo.deletePosition(uuid);
  }
}
