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
  Put,
  Res,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { AppErrorExceptionFilter } from '@d-debt/share';
import { FileInterceptor } from '@nestjs/platform-express';
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
  create(@Body() data: Prisma.meetingCreateManyInput) {
    return this.meetingService.create(data);
  }
  @Post('/import/:id')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') idmeeting: string,
  ): Promise<any> {
    return this.meetingService.uploadfile(file, idmeeting);
  }
  @Get('filepdf/:roomid')
  async getFile(@Param('roomid') roomid: string, @Res() res: Response) {
    const path = await this.meetingService.getFilePdf(roomid);
    res.download(path[0].pathfile + path[0].namefile);
  }
  @Post('agendes')
  createAgendes(@Body() data: []) {
    return this.meetingService.createAgendes(data);
  }
}
