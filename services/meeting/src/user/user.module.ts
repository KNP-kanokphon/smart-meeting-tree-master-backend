import { Module } from '@nestjs/common';
import { UserService, UserattendeesService } from './user.service';
import { UserController, UserattendController } from './user.controller';
import { PrismaModule } from '@d-debt/share';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, UserattendController],
  providers: [UserService, UserattendeesService],
})
export class UserModule {}
