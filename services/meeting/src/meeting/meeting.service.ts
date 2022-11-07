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
    console.log(findAgendaByid);

    return this.agendesRepo.findAgendaByid(findAgendaByid);
  }
  async findByid(roomid: string) {
    return this.meetingRepo.findByid(roomid);
  }
  async create(data: any) {
    // Prisma.meetingCreateManyInput
    const meetingData = {
      detail: data.detail,
      title: data.title,
      room: data.room,
      floor: data.floor,
      building: data.building,
      day: data.day,
      starttime: data.starttime,
      endtime: data.endtime,
      uuid: data.uuid,
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
}
