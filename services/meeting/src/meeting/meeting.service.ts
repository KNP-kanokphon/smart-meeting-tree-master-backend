import { Injectable } from '@nestjs/common';
import { AppError, MeetingRepository, FileRepository } from '@d-debt/share';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';

@Injectable()
export class MeetingService {
  constructor(
    private meetingRepo: MeetingRepository,
    private fileRepo: FileRepository,
  ) {}

  async findAll() {
    return this.meetingRepo.findAll();
  }
  async findByid(roomid: string) {
    return this.meetingRepo.findByid(roomid);
  }
  async create(data: Prisma.meetingCreateManyInput) {
    return this.meetingRepo.create(data);
  }
  async uploadfile(file: any, idmeeting: string) {
    const path = `./pdfFiles/${idmeeting}/`;
    const resultEpm = fs.mkdirSync(path, { recursive: true });
    fs.createWriteStream(`${path}/${file.originalname}`).write(file.buffer);

    return this.fileRepo.create(idmeeting, file.originalname, path);
  }
  async getFilePdf(idmeeting: string) {
    return this.fileRepo.getFileByid(idmeeting);
  }
}
