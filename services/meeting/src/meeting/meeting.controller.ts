import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Put,
  Res,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { AppErrorExceptionFilter } from '@d-debt/share';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import * as fs from 'fs';
import path from 'path';
import { Response } from 'express';

@Controller('meeting')
@UseFilters(AppErrorExceptionFilter)
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}
  @Get()
  findAll() {
    return this.meetingService.findAll();
  }
  @Get(':roomid')
  findByid(@Param('roomid') roomid: string) {
    return this.meetingService.findByid(roomid);
  }
  @Get('getDetailagendes/:roomid/:step')
  getDetailagendes(
    @Param('roomid') roomid: string,
    @Param('step') step: string,
  ) {
    return this.meetingService.getDetailagendes(roomid, step);
  }
  @Get('/getfilenamesummary/:roomid')
  getfilenamesummary(
    @Param('roomid') roomid: string,
    @Param('namefile') namefile: string,
  ) {
    return this.meetingService.getFilePdf(roomid, namefile);
  }
  @Get('getfileoverview/:roomid/:namefile')
  async getFile(
    @Param('roomid') roomid: string,
    @Param('namefile') namefile: string,
  ) {
    // const file = await this.meetingService.getFilePdf(roomid, namefile);
    // console.log(`/files_all/file_overviwe/${roomid}/${namefile}`);
    // fs.readFile(
    //   `/files_all/file_overviwe/${roomid}/${namefile}`,
    //   { encoding: 'utf8' },
    //   function (err, data) {
    //     console.log(data);

    //     // ...
    //   },
    // );

    const data = fs.readFileSync(
      `./files_all/file_overviwe/${roomid}/${namefile}`,
    );
    return Buffer.from(data);
    // return await this.meetingService.getFilePdf(roomid, namefile);
    // res.download(path[0].pathfile + path[0].namefile);
  }
  @Get('getPathFilePdf/:roomid')
  async getPathFilePdf(@Param('roomid') roomid: string) {
    return this.meetingService.getPathFilePdf(roomid);
  }
  @Get('getfilestep/:roomid/:step/:namefile')
  async getfilestep(
    @Param('roomid') roomid: string,
    @Param('step') step: string,
    @Param('namefile') namefile: string,
  ) {
    const data = fs.readFileSync(
      `./files_all/file_agenda/${roomid}/${step}/${namefile}`,
    );
    return Buffer.from(data);
    // return this.meetingService.getfilestep(roomid, step, namefile);
  }
  @Get('agenda/:roomid')
  findAgendaByid(@Param('roomid') roomid: string) {
    return this.meetingService.findAgendaByid(roomid);
  }
  @Get('detailfood/:roomid')
  findFoodFetail(@Param('roomid') roomid: string) {
    return this.meetingService.findFoodFetail(roomid);
  }
  @Put()
  updateroom(
    @Body('data')
    data: {
      roomid: string | any;
      title: string;
      room: string;
      floor: string;
      building: string;
      meetingPlace: string;
      date: Date;
      timeStart: string;
      timeEnd: string;
      detailMeeting: string;
    },
    @Body('usersatd')
    usersatd: {
      id: number;
      username: string;
      uuidprofile: string;
      idmeeting: string;
      type: string;
      type_user: string;
      position: string;
      phone: string | null;
      email: string | null;
      model: string | null;
      confirm: boolean;
      checkin: boolean;
      foodstatus: boolean;
      signature: string | null;
    },
    @Body('userboard')
    userboard: {
      id: number;
      username: string;
      uuidprofile: string;
      idmeeting: string;
      type: string;
      type_user: string;
      position: string;
      phone: string | null;
      email: string | null;
      model: string | null;
      confirm: boolean;
      checkin: boolean;
      foodstatus: boolean;
      signature: string | null;
    },
  ) {
    return this.meetingService.updateroom(data, usersatd, userboard);
  }

  @Post()
  create(@Body() data: any) {
    return this.meetingService.create(data);
  }
  @Post('updatemeeting')
  updatemeeting(
    @Body('id') id: any,
    @Body('dataAgenda') dataAgenda: any,
    @Body('getLastdata') getLastdata: any,
    @Body('dataFood') dataFood: any,
    @Body('oldFileupdate') oldFileupdate: any,
  ) {
    return this.meetingService.updatemeeting(
      id,
      dataAgenda,
      getLastdata,
      dataFood,
      oldFileupdate,
    );
  }
  @Post('/updatefileoverviwe/:roomid')
  @UseInterceptors(AnyFilesInterceptor())
  async updatefileoverviwe(
    @Param('roomid') idmeeting: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any> {
    return this.meetingService.updatefileoverviwe(idmeeting, files);
  }
  @Post('/import/:id/:namefile')
  @UseInterceptors(AnyFilesInterceptor())
  async upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') idmeeting: string,
    @Param('namefile') namefile: string,
  ): Promise<any> {
    return this.meetingService.uploadfile(files, idmeeting, namefile);
  }

  @Post('/savesummarymeeting/:roomid')
  async savesummarymeeting(
    @Param('roomid') idmeeting: string,
    @Body('data') data: string,
  ) {
    return this.meetingService.savesummarymeeting(idmeeting, data);
  }
  @Post('/savesummarymeetingFile/:roomid')
  @UseInterceptors(AnyFilesInterceptor())
  async savesummarymeetingFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('roomid') idmeeting: string,
  ): Promise<any> {
    return this.meetingService.savesummarymeetingFile(idmeeting, files);
  }

  @Post('agenda')
  @UseInterceptors(AnyFilesInterceptor())
  createAgendes(
    @Body('agendas') agendas: any,
    @Body('id') id: string,
    @Body('step') step: string,
  ) {
    return this.meetingService.createAgendes(agendas, id, step);
  }
  @Post('agendafile/:id/:step')
  @UseInterceptors(AnyFilesInterceptor())
  saveagendafile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Param('step') step: string,
  ) {
    return this.meetingService.saveagendafile(id, step, files);
  }

  @Delete('agendafile/:roomid/:step/:namefile')
  deleteFileagenda(
    @Param('roomid') roomid: any,
    @Param('step') step: any,
    @Param('namefile') namefile: any,
  ) {
    return this.meetingService.deleteFileagenda(roomid, step, namefile);
  }
}
