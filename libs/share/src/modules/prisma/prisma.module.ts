import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from '../../repositories/User.repository';
import { MeetingRepository } from '../../repositories/Meeting.repository';
import { UserattendeesRepository } from '../../repositories/Userattendees.repository';
import { FileRepository } from '../../repositories/Files.repository';
import { ListnameRepository } from '../../repositories/Listname.repository';
import { AgendesRepository } from '../../repositories/Agendes.repository';
import { DetailAgendesRepository } from '../../repositories/DetailAgendes.repository';
import { FoodRepository } from '../../repositories/Foodinmeeting.repository';

const services = [
  PrismaService,
  UserRepository,
  MeetingRepository,
  UserattendeesRepository,
  FileRepository,
  ListnameRepository,
  AgendesRepository,
  DetailAgendesRepository,
  FoodRepository,
];
@Module({
  providers: [...services],
  exports: [...services],
})
export class PrismaModule {}
