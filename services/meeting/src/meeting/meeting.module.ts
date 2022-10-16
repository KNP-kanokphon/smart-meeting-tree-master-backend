import { Module } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { MeetingController } from './meeting.controller';
import { PrismaModule } from '@d-debt/share';

@Module({
  imports: [PrismaModule],
  controllers: [MeetingController],
  providers: [MeetingService],
})
export class MeetingModule {}
