import { Injectable } from '@nestjs/common';
import { AppError, MeetingRepository } from '@d-debt/share';
import { Prisma } from '@prisma/client';

@Injectable()
export class MeetingService {
  constructor(private meetingRepo: MeetingRepository) {}

  async findAll() {
    return this.meetingRepo.findAll();
  }
  async findByid(roomid: string) {
    return this.meetingRepo.findByid(roomid);
  }
  async create(data: Prisma.meetingCreateManyInput) {
    return this.meetingRepo.create(data);
  }
}
