import {
  AppError,
  ContactRepository,
  UserattendeesRepository,
  ListnameRepository,
  FoodRepository,
  PositionRepository,
  UserpartyRepository,
  UserpartyhistoryRepository,
  GroupRepository,
} from '@d-debt/share';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { el } from 'date-fns/locale';
import { async } from 'rxjs';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private contactRepo: ContactRepository,
    private listnameRepo: ListnameRepository,
    private positionRepo: PositionRepository,
    private userattendeesRepo: UserattendeesRepository,
  ) {}

  findAll() {
    return this.contactRepo.findAll();
  }
  async create(data: Prisma.contactsCreateManyInput) {
    return this.contactRepo.create(data);
  }
  async findUser(userid: string) {
    return await this.listnameRepo.findUser(userid);
  }

  async findUserByID(userid: string) {
    return await this.contactRepo.findById(userid);
  }

  async importusers(data: any) {
    return this.contactRepo.importuser(data);
  }

  async deleteUser(uuid: any) {
    return this.contactRepo.deleteUser(uuid);
  }

  async updateUser(userid: string, data: any) {
    return this.contactRepo.updateUser(userid, data);
  }
  async loginbyphonenumber(phonenumber: string, idroom: string) {
    function replacePhoneNumber(phoneNumber) {
      return phoneNumber.replace(/[^0-9]/g, '');
    }

    function checkForCharacters(inputString) {
      let newdata;
      if (inputString.includes('\n')) {
        newdata = inputString.split('\n');
      }

      if (inputString.includes(',')) {
        newdata = inputString.split(',');
      }
      return newdata;
    }

    const result = await this.contactRepo.loginbyphonenumber();
    // function mapposition(idposition) {
    //   if (idposition.length > 0) {
    //   } else {
    //     idposition.map(async (x: any) => {
    //       console.log(await this.positionRepo.findbyid(x));
    //     });
    //   }
    // }
    // console.log(result);

    const dataAll = [];
    result.map((x: any) => {
      if (x.phonenumber.includes('\n') || x.phonenumber.includes(',')) {
        checkForCharacters(x.phonenumber).map((e: any) => {
          dataAll.push({
            uuid: x.uuid,
            username: x.username,
            phonenumber: replacePhoneNumber(e),
            prefix: x.prefix,
            course: x.course,
            uuidposition: x.uuidposition,
          });
        });
      } else {
        dataAll.push({
          uuid: x.uuid,
          username: x.username,
          phonenumber: replacePhoneNumber(x.phonenumber),
          prefix: x.prefix,
          course: x.course,
          uuidposition: x.uuidposition,
        });
      }
    });
    const resultfilter = dataAll.filter(
      (x: any) =>
        String(x.phonenumber) === String(replacePhoneNumber(phonenumber)),
    );
    const dataFilter = [];
    const resultUseratd = await this.userattendeesRepo.findUserInroom(idroom);
    resultUseratd.map((x: any) => {
      if (String(resultfilter[0].uuid) === String(x.uuidprofile)) {
        dataFilter.push({
          uuid: resultfilter[0].uuid,
          username: resultfilter[0].username,
          phonenumber: resultfilter[0].phonenumber,
          prefix: resultfilter[0].prefix,
          course: resultfilter[0].course,
          uuidposition: resultfilter[0].uuidposition,
        });
      }
    });
    console.log(dataFilter);

    return dataFilter;
  }
}

@Injectable()
export class UserattendeesService {
  constructor(
    private userattendeesRepo: UserattendeesRepository,
    private contactRepo: ContactRepository,
    private listnameRepo: ListnameRepository,
    private positionRepo: PositionRepository,
    private groupRepo: GroupRepository,
  ) {}

  findAll() {
    return this.contactRepo.findAll();
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
    return await this.contactRepo.findAll();
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
  async updateFood(
    roomid: any,
    userid: any,
    statusfood: boolean,
    statusgift: boolean,
  ) {
    return await this.userattendeesRepo.updatefoodUser(
      roomid,
      userid,
      statusfood,
      statusgift,
    );
  }
  async deletePosition(uuid: any) {
    return await this.positionRepo.deletePosition(uuid);
  }

  async updateUserDetail(roomid: any, userId: any, data: any) {
    return await this.userattendeesRepo.updateUserDetail(roomid, userId, data);
  }
  async updateUserNoMeet(roomid: any, userId: any, data: any) {
    return await this.userattendeesRepo.updateUserNoMeet(roomid, userId, data);
  }
  async GroupAll() {
    return await this.groupRepo.findAll();
  }
  async CreateGroup(data: any) {
    return await this.groupRepo.create(data);
  }
  async DeleteGroup(data: any) {
    return await this.groupRepo.deletegroup(data);
  }
  async UpdateGroup(data: any, uuid: any) {
    return await this.groupRepo.update(uuid, data);
  }
  async getstatusprofile(roomid: string, userid: string) {
    return await this.userattendeesRepo.findbyid(roomid, userid);
    // console.log(userid);
  }
  async updatestatuscheckin(roomid, userid, statuschckin) {
    return await this.userattendeesRepo.updatestatuscheckin(
      roomid,
      userid,
      statuschckin,
    );
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
    // return await this.userpartyRepo.update(userid);
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
