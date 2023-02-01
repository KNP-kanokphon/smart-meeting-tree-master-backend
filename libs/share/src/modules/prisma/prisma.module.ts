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
import { GroupRepository } from '../../repositories/Group.repository';
import { VotehistoryRepository } from '../../repositories/Votehistory.repository';
import { UserinfoRepository } from '../../repositories/User.Repository';
import { CourseRepository } from 'src/repositories/Course.repository';
import { ActivityplanRepository } from 'src/repositories/Activityplan.repository';
import { ActivityRepository } from 'src/repositories/Activity.repository';
import { ActivityuserlogRepository } from 'src/repositories/Activityuserlog.repository';

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
  UserinfoRepository,
  CourseRepository,
  ActivityplanRepository,
  ActivityRepository,
  ActivityuserlogRepository,
];
@Module({
  providers: [...services],
  exports: [...services],
})
export class PrismaModule {}
