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
  @Get('filepdf/:roomid')
  async getFile(@Param('roomid') roomid: string, @Res() res: Response) {
    const path = await this.meetingService.getFilePdf(roomid);
    res.download(path[0].pathfile + path[0].namefile);
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
}
