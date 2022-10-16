import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreController } from './app.controller';
import { CoreService } from './app.service';
import configs from './configs';
import { UserModule } from './user/user.module';
import { MeetingModule } from './meeting/meeting.module';
// import { UserTypeModule } from './user-type/user-type.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configs] }),
    UserModule,
    MeetingModule,
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
