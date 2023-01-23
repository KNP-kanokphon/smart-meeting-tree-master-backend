import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ContactRepository } from '../../repositories/Contacts.repository';
import { MeetingRepository } from '../../repositories/Meeting.repository';
import { UserattendeesRepository } from '../../repositories/Userattendees.repository';
import { FileRepository } from '../../repositories/file.repository';
import { ListnameRepository } from '../../repositories/Listname.repository';
import { AgendesRepository } from '../../repositories/Agendes.repository';
import { FoodRepository } from '../../repositories/Foodinmeeting.repository';
import { PositionRepository } from '../../repositories/Position.repository';
import { UserpartyRepository } from '../../repositories/Userparty.repository';
import { UserpartyhistoryRepository } from '../../repositories/Userpartyhistory.repository';
import { GroupRepository } from '../../repositories/Gruop.repository';
import { VotehistoryRepository } from '../../repositories/Votehistory.repository';

const services = [
  PrismaService,
  ContactRepository,
  MeetingRepository,
  UserattendeesRepository,
  FileRepository,
  ListnameRepository,
  AgendesRepository,
  FoodRepository,
  PositionRepository,
  UserpartyRepository,
  UserpartyhistoryRepository,
  GroupRepository,
  VotehistoryRepository,
];
@Module({
  providers: [...services],
  exports: [...services],
})
export class PrismaModule {}
