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
  UserinfoRepository,
  MeetingRepository,
  CourseRepository,
} from '@d-debt/share';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
@Injectable()
export class UserService {
  constructor(
    private meetingRepo: MeetingRepository,
    private contactRepo: ContactRepository,
    private listnameRepo: ListnameRepository,
    private positionRepo: PositionRepository,
    private userattendeesRepo: UserattendeesRepository,
    private UserRepo: UserinfoRepository,
  ) {}

  async shrinkdata(subToken: string) {
    const resultfinduser = await this.UserRepo.findOne(subToken);
    if (resultfinduser === null) {
      return null;
    }
    return resultfinduser;
    // console.log(subToken);
    // console.log(roles.roles.length);

    // const data = {
    //   roleName: roles.data,
    //   description: roles.data,
    // };
    // console.log(data);

    // await this.UserRepo.createrole(data);
    // console.log(await this.UserRepo.createrole(data));
  }
  async updateprofile(name, email, subToken) {
    const data = {
      employeeId: subToken,
      fullname: name,
      email: email,
      title: '',
      is_active: true,
    };

    return await this.UserRepo.create(data);
  }

  async createrole(roleName, description) {
    const data = {
      roleName: roleName,
      description: description,
    };
    // await this.UserRepo.createrole(data);
  }

  async checkprofile(subToken, name, email) {
    const profile = await this.UserRepo.findOne(subToken);

    if (profile) {
    } else {
      return 202;
    }
  }

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
    const meeting = await this.meetingRepo.findByid(idroom);

    const dateStr = dayjs(`${meeting[0].day} ${meeting[0].starttime}`)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD');
    const dateEnd = dayjs(`${new Date()}`)
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DD');

    if (Object.keys(meeting).length === 0) {
      return 'notroom';
    }
    if (dateStr !== dateEnd) {
      return 'expride';
    }

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

    if (Object.keys(resultfilter).length > 0) {
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
      return dataFilter;
    }
    return resultfilter;
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
    private courseRepo: CourseRepository,
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
  async Createcourse(data) {
    return await this.courseRepo.create(data);
  }
  async Updatecourse(data) {
    return await this.courseRepo.update(data);
  }
  async deletecourse(uuid) {
    return await this.courseRepo.delete(uuid);
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
  async CourseAll() {
    return await this.courseRepo.findAll();
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
  async submituserexternal(
    roomid,
    newuuid,
    username,
    phonenumber,
    email,
    model,
    course,
    position,
  ) {
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
    if (resultfilter.length === 0) {
      const createNewuseratd = {
        username: username,
        uuidprofile: newuuid,
        idmeeting: roomid,
        type: '',
        type_user: 'front_of_work',
        position: position,
        phone: replacePhoneNumber(phonenumber),
        email: email,
        model: model,
        confirm: true,
        checkin: false,
        foodstatus: false,
        gifstatus: false,
        votestatus: false,
        uuidposition: position,
      };
      const createNewusercontact = {
        uuid: newuuid,
        username: username,
        prefix: username,
        idcard: '',
        bridday: '',
        phonenumber: replacePhoneNumber(phonenumber),
        email: email,
        course: course,
        course1: '',
        model: model,
        position: position,
      };
      const createatd = await this.userattendeesRepo.create(createNewuseratd);
      const createcontact = await this.contactRepo.create(createNewusercontact);
      console.log('if', createatd);

      return createatd;
    } else {
      const result = await this.userattendeesRepo.findbyid(
        roomid,
        resultfilter[0].uuid,
      );
      if (result.length === 0) {
        const useratd = {
          username: resultfilter[0].username,
          uuidprofile: resultfilter[0].uuid,
          idmeeting: roomid,
          type: resultfilter[0].type,
          type_user: 'front_of_work',
          position: resultfilter[0].position,
          phone: resultfilter[0].phonenumber,
          email: resultfilter[0].email,
          model: resultfilter[0].model,
          confirm: true,
          checkin: false,
          foodstatus: false,
          gifstatus: false,
          votestatus: false,
          username_eng: resultfilter[0].username_eng,
          uuidposition: resultfilter[0].uuidposition,
        };
        const createatd = await this.userattendeesRepo.create(useratd);
        console.log('else', createatd);
        return createatd;
      } else {
        return result;
      }
    }
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
