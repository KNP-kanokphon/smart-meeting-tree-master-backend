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
  @Get('getDetailagendes/:roomid/:idggendess')
  getDetailagendes(
    @Param('roomid') roomid: string,
    @Param('idggendess') idagendess: string,
  ) {
    return this.meetingService.getDetailagendes(roomid, idagendess);
  }
  @Post()
  create(@Body() data: any) {
    return this.meetingService.create(data);
  }
  @Post('/import/:id')
  @UseInterceptors(AnyFilesInterceptor())
  async upload(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') idmeeting: string,
  ): Promise<any> {
    return this.meetingService.uploadfile(files, idmeeting);
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

  @Get('getfileoverview/:roomid')
  async getFile(@Param('roomid') roomid: string, @Res() res: Response) {
    return await this.meetingService.getFilePdf(roomid);
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
    return this.meetingService.getfilestep(roomid, step, namefile);
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
  @Get('agenda/:roomid')
  findAgendaByid(@Param('roomid') roomid: string) {
    return this.meetingService.findAgendaByid(roomid);
  }
  @Get('detailfood/:roomid')
  findFoodFetail(@Param('roomid') roomid: string) {
    return this.meetingService.findFoodFetail(roomid);
  }
}
