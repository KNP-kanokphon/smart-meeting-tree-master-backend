import { Injectable } from '@nestjs/common';
import {
  AppError,
  MeetingRepository,
  FileRepository,
  AgendesRepository,
  DetailAgendesRepository,
  FoodRepository,
} from '@d-debt/share';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';
import { async } from 'rxjs';

@Injectable()
export class MeetingService {
  constructor(
    private meetingRepo: MeetingRepository,
    private fileRepo: FileRepository,
    private agendesRepo: AgendesRepository,
    private detailAgendesRepo: DetailAgendesRepository,
    private foodRepo: FoodRepository,
  ) {}

  async findAll() {
    return this.meetingRepo.findAll();
  }

  async findAgendaByid(findAgendaByid: string) {
    return this.agendesRepo.findAgendaByid(findAgendaByid);
  }

  async findByid(roomid: string) {
    return this.meetingRepo.findByid(roomid);
  }

  async create(data: Prisma.meetingsCreateManyInput) {
    // Prisma.meetingCreateManyInput
    const meetingData = {
      detail: data.detail,
      title: data.title,
      room: data.room,
      floor: data.floor,
      building: data.building,
      meetingplace: data.meetingplace,
      day: data.day,
      starttime: data.starttime,
      endtime: data.endtime,
      uuid: data.uuid,
      summarychecklist: false,
    };
    data['dataFood'].map((e) => {
      const foodData = {
        uuid: data.uuid,
        typefood: e.typefood,
        namefood: e.namefood,
      };
      this.foodRepo.create(foodData);
    });

    return this.meetingRepo.create(meetingData);
  }
  async uploadfile(files: any, idmeeting: string) {
    const path = `./files_all/file_overviwe/${idmeeting}/`;
    const resultEpm = fs.mkdirSync(path, { recursive: true });
    const step = null;
    const type = 'fileOverviwe';
    // save file path file
    files.map((e) => {
      fs.createWriteStream(`${path}/${e.originalname}`).write(e.buffer);
    });
    // insert data path file
    files.map((e) => {
      return this.fileRepo.create(idmeeting, e.originalname, path, type, step);
    });
  }
  async getFilePdf(idmeeting: string) {
    return this.fileRepo.getFileByid(idmeeting);
  }
  async getfilestep(idmeeting: string, step: any, namefile: any) {
    return this.fileRepo.getfilestep(idmeeting, step, namefile);
  }
  async getPathFilePdf(idmeeting: string) {
    return this.fileRepo.getPathFilePdf(idmeeting);
  }
  async createAgendes(data: any, id: string, step: string) {
    const path = `./files_all/file_agenda/${id}/${step}/`;
    const dataAgende = {
      uuid: id,
      agendes: data.agendas,
      detailagendes: data.detail,
      step: String(step),
    };
    await this.agendesRepo.create(dataAgende);
    data.detailAgendes.map(async (e, i) => {
      const data = {
        idmeeting: id,
        step: String(step),
        idagendess: String(i),
        detail: e.detail,
        type: null,
        filepart: path,
      };
      await this.detailAgendesRepo.create(data);
    });
  }
  async saveagendafile(idmeeting: string, step: string, files: any) {
    if (files !== undefined || files !== '' || files !== null) {
      const path = `./files_all/file_agenda/${idmeeting}/${step}/`;
      const resultEpm = fs.mkdirSync(path, { recursive: true });
      const type = 'fileAgenda';
      // save file path file
      files.map((e) => {
        fs.createWriteStream(`${path}/${e.originalname}`).write(e.buffer);
      });
      // insert data path file
      files.map((e) => {
        return this.fileRepo.create(
          idmeeting,
          e.originalname,
          path,
          type,
          step,
        );
      });
    }
  }
  async findFoodFetail(roomid: any) {
    return this.foodRepo.findByid(roomid);
  }
  async getDetailagendes(roomid: any, step: any) {
    return this.detailAgendesRepo.findByid(roomid, step);
  }
  async savesummarymeeting(roomid: string, data: any) {
    return this.meetingRepo.updateSummary(roomid, data);
  }
  async savesummarymeetingFile(roomid: string, files: any) {
    const path = `./files_all/file_summarymeeting/${roomid}/`;
    const type = 'filesummary';
    const step = null;
    const resultEpm = fs.mkdirSync(path, { recursive: true });
    files.map((e) => {
      fs.createWriteStream(`${path}/${e.originalname}`).write(e.buffer);
    });
    files.map((e) => {
      return this.fileRepo.create(roomid, e.originalname, path, type, step);
    });
  }
  async updateroom(
    data: {
      roomid: string | any;
      title: string;
      room: string;
      floor: string;
      building: string;
      meetingPlace: string;
      date: Date;
      timeStart: string;
      timeEnd: string;
      detailMeeting: string;
    },
    usersatd: {
      id: number;
      username: string;
      uuidprofile: string;
      idmeeting: string;
      type: string;
      type_user: string;
      position: string;
      phone: string | null;
      email: string | null;
      model: string | null;
      confirm: boolean;
      checkin: boolean;
      foodstatus: boolean;
      signature: string | null;
    },
    userboard: {
      id: number;
      username: string;
      uuidprofile: string;
      idmeeting: string;
      type: string;
      type_user: string;
      position: string;
      phone: string | null;
      email: string | null;
      model: string | null;
      confirm: boolean;
      checkin: boolean;
      foodstatus: boolean;
      signature: string | null;
    },
  ) {
    {
      console.log(data);
      console.log(usersatd);
      console.log(userboard);

      // "userBoard": [
      //     {
      //         "id": 29,
      //         "username": "นางสาวอรสา ขาวงาม",
      //         "uuidprofile": "51e1adab-de06-49f7-803d-4edafbf00701",
      //         "idmeeting": "60cc5f46-31c7-4e9f-9b49-c467e7dcf3f1",
      //         "type": "userBoard",
      //         "type_user": "previous",
      //         "position": "d030cc5e-33c0-4375-9d22-802b15b9e149",
      //         "phone": null,
      //         "email": null,
      //         "model": null,
      //         "confirm": false,
      //         "checkin": false,
      //         "foodstatus": false,
      //         "signature": null
      //     }
      // ],
      // "userAttendee": [
      //     {
      //         "id": 30,
      //         "username": "ดร.นักสิทธิ์ ศักดาพัฒน์",
      //         "uuidprofile": "284dc21f-db3b-47d3-8c8b-9652fa0f281c",
      //         "idmeeting": "60cc5f46-31c7-4e9f-9b49-c467e7dcf3f1",
      //         "type": "userAttendee",
      //         "type_user": "previous",
      //         "position": "1a447fe9-9189-47e0-8261-e92d628e77ec",
      //         "phone": null,
      //         "email": null,
      //         "model": null,
      //         "confirm": false,
      //         "checkin": false,
      //         "foodstatus": false,
      //         "signature": null
      //     }
      // ],
      // "title": "เรื่อง",
      // "room": "ห้องประชุม",
      // "floor": "ชั้น",
      // "building": "อาคาร",
      // "meetingPlace": "สถานที่ประชุม",
      // "date": "2022-12-13",
      // "timeStart": "09:00:00",
      // "timeEnd": "10:00:00",
      // "detailMeeting": "รายละเอียดการประชุม"
    }
  }
}
