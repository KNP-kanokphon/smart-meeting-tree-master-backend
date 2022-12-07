import { Module } from '@nestjs/common';
import {
  UserService,
  UserattendeesService,
  UserPartyService,
} from './user.service';
import {
  UserController,
  UserattendController,
  UserPartyController,
} from './user.controller';
import { PrismaModule } from '@d-debt/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, UserattendController, UserPartyController],
  providers: [UserService, UserattendeesService, UserPartyService],
})
export class UserModule {}
