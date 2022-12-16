import {
  AppError,
  UserRepository,
  UserattendeesRepository,
  ListnameRepository,
  FoodRepository,
  PositionRepository,
  UserpartyRepository,
  UserpartyhistoryRepository,
} from '@d-debt/share';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { el } from 'date-fns/locale';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepo: UserRepository,
    private listnameRepo: ListnameRepository,
  ) {}

  findAll() {
    return this.userRepo.findAll();
  }
  async create(data: Prisma.userCreateManyInput) {
    return this.userRepo.create(data);
  }
  async findUser(userid: string) {
    return await this.listnameRepo.findUser(userid);
  }

  async importusers(data: any) {
    return this.userRepo.importuser(data);
  }

  async deleteUser(uuid: any) {
    return this.userRepo.deleteUser(uuid);
  }

  async updateUser(userid: string, data: any) {
    return this.userRepo.updateUser(userid, data);
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

  findById(data: any, userid: string) {
    return this.userRepo.findById(data, userid);
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
        position: e.position,
      };
      this.userattendeesRepo.createMany(data);
      console.log('userBoard', e);
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
        position: e.position,
      };
      this.userattendeesRepo.createMany(data);
      console.log('userAttendee', e);
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
  async createUserAdd(data: Prisma.listnameCreateManyInput) {
    return await this.listnameRepo.createMany(data);
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
  async updateFood(roomid: any, userid: any, status: boolean) {
    return await this.userattendeesRepo.updatefoodUser(
      roomid,
      userid,
      Boolean(status),
    );
  }
  async deletePosition(uuid: any) {
    return await this.positionRepo.deletePosition(uuid);
  }

  async updateUserDetail(roomid: any, userId: any, data: any) {
    return await this.userattendeesRepo.updateUserDetail(roomid, userId, data);
  }
}

@Injectable()
export class UserPartyService {
  constructor(
    private userpartyRepo: UserpartyRepository,
    private userpartyhistoryRepo: UserpartyhistoryRepository,
  ) {}

  findAll() {
    return this.userpartyRepo.findAll();
  }
  async create(data: Prisma.userpartyCreateManyInput) {
    return this.userpartyRepo.create(data['data']);
  }
  async findUser(userid: string) {
    return await this.userpartyRepo.findUser(userid);
  }
  async update(userid: string) {
    return await this.userpartyRepo.update(userid);
  }
  async updateuserparty(userid: string) {
    const userDetail: any = await this.userpartyRepo.findUser(userid);
    if (Object.keys(userDetail).length > 0) {
      const data = {
        name: userDetail[0].name,
        iduser: userDetail[0].iduser,
        uuid: userDetail[0].uuid,
        checkin: true,
        recivegift: false,
      };
      return await this.userpartyhistoryRepo.create(data);
    } else {
      return 0;
    }
  }
  async recivegif(userid: string) {
    const userDetail: any = await this.userpartyRepo.findUser(userid);
    if (Object.keys(userDetail).length > 0) {
      return await this.userpartyhistoryRepo.update(userid);
    } else {
      return 0;
    }
  }
}
