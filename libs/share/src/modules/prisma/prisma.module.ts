import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Contactsitory } from '../../repositories/Contacts.repository';
import { MeetingRepository } from '../../repositories/Meeting.repository';
import { UserattendeesRepository } from '../../repositories/Userattendees.repository';
import { FileRepository } from '../../repositories/file.repository';
import { ListnameRepository } from '../../repositories/Listname.repository';
import { AgendesRepository } from '../../repositories/Agendes.repository';
import { DetailAgendesRepository } from '../../repositories/DetailAgendes.repository';
import { FoodRepository } from '../../repositories/Foodinmeeting.repository';
import { PositionRepository } from '../../repositories/Position.repository';
import { UserpartyRepository } from '../../repositories/Userparty.repository';
import { UserpartyhistoryRepository } from '../../repositories/Userpartyhistory.repository';
import { GroupRepository } from '../../repositories/Gruop.repository';

const services = [
  PrismaService,
  Contactsitory,
  MeetingRepository,
  UserattendeesRepository,
  FileRepository,
  ListnameRepository,
  AgendesRepository,
  DetailAgendesRepository,
  FoodRepository,
  PositionRepository,
  UserpartyRepository,
  UserpartyhistoryRepository,
  GroupRepository,
];
@Module({
  providers: [...services],
  exports: [...services],
})
export class PrismaModule {}
