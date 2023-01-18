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
  // @Get('getDetailagendes/:roomid/:step')
  // getDetailagendes(
  //   @Param('roomid') roomid: string,
  //   @Param('step') step: string,
  // ) {
  //   return this.meetingService.getDetailagendes(roomid, step);
  // }
  @Get('getFileoverview/:roomid')
  getFileoverview(@Param('roomid') roomid: string) {
    return this.meetingService.getFileoverview(roomid);
  }
  @Get('getFileagenda/:roomid')
  getFileagenda(@Param('roomid') roomid: string) {
    return this.meetingService.getFileagenda(roomid);
  }

  @Get('/getfilenamesummary/:roomid')
  getfilenamesummary(
    @Param('roomid') roomid: string,
    @Param('namefile') namefile: string,
  ) {
    return this.meetingService.getFilePdf(roomid, namefile);
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
  @Post()
  create(@Body() data: any) {
    return this.meetingService.create(data);
  }

  @Post('dowloadfileoverview')
  async getFile(
    @Body('roomid') roomid: string,
    @Body('namefile') namefile: string,
  ) {
    const data = fs.readFileSync(
      `./files_all/file_overviwe/${roomid}/${namefile}`,
    );
    return Buffer.from(data);
    // return await this.meetingService.getFilePdf(roomid, namefile);
    // res.download(path[0].pathfile + path[0].namefile);
  }
  @Put('')
  updatemeeting(
    @Body('idmeeting') idmeeting: any,
    @Body('dataAgenda') dataAgenda: any,
    @Body('user') user: any,
    @Body('dataDetail') dataDetail: any,
    @Body('dataFood') dataFood: any,
  ) {
    return this.meetingService.updatemeeting(
      idmeeting,
      dataAgenda,
      user,
      dataDetail,
      dataFood,
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
  @Post('/uploadfileoverview/:id/:namefile/:idfile')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadfileoverview(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') idmeeting: string,
    @Param('namefile') namefile: string,
    @Param('idfile') idfile: number,
  ): Promise<any> {
    return this.meetingService.uploadfileoverview(
      files,
      idmeeting,
      namefile,
      idfile,
    );
  }
  @Post('/updateoldFileoverview')
  updateoldFileoverview(@Body() data: any) {
    return this.meetingService.updateoldFileoverview(data);
  }
  @Post('/updateoldFileagenda')
  updateoldFileagenda(@Body() data: any) {
    return this.meetingService.updateoldFileagenda(data);
  }
  @Post('/uploadfileagendas/:id/:namefile/:filenumber/:numberstep')
  @UseInterceptors(AnyFilesInterceptor())
  async uploadfileagendas(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') idmeeting: string,
    @Param('namefile') namefile: string,
    @Param('filenumber') filenumber: number,
    @Param('numberstep') numberstep: number,
  ): Promise<any> {
    return this.meetingService.uploadfileagendas(
      files,
      idmeeting,
      namefile,
      filenumber,
      numberstep,
    );
  }
  @Put('/updatefileoverview/:id/:namefile/:idfile')
  @UseInterceptors(AnyFilesInterceptor())
  async updatefileoverview(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') idmeeting: string,
    @Param('namefile') namefile: string,
    @Param('idfile') idfile: number,
  ): Promise<any> {
    return this.meetingService.updatefileoverview(
      files,
      idmeeting,
      namefile,
      idfile,
    );
  }
  @Put('/updatefileagendas/:id/:namefile/:filenumber/:numberstep')
  @UseInterceptors(AnyFilesInterceptor())
  async updatefileagendas(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') idmeeting: string,
    @Param('namefile') namefile: string,
    @Param('filenumber') filenumber: number,
    @Param('numberstep') numberstep: number,
  ): Promise<any> {
    return this.meetingService.updatefileagendas(
      files,
      idmeeting,
      namefile,
      filenumber,
      numberstep,
    );
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
  @Delete('deletefileoverviewAll/:idroom')
  deletefileoverviewAll(@Param('idroom') idroom: any) {
    return this.meetingService.deletefileoverviewAll(idroom);
  }
  @Delete('deletefileagendesAll/:idroom/:number')
  deletefileagendesAll(
    @Param('idroom') idroom: any,
    @Param('number') number: any,
  ) {
    return this.meetingService.deletefileagendesAll(idroom, number);
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
