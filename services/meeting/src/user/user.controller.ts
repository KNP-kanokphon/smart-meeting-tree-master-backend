import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService, UserattendeesService } from './user.service';
import * as papa from 'papaparse';
import { AppErrorExceptionFilter } from '@d-debt/share';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
const csv = require('csvtojson');
import { Express } from 'express';

@Controller('user')
@UseFilters(AppErrorExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() data: Prisma.userCreateManyInput) {
    return this.userService.create(data);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
@Controller('userattendees')
@UseFilters(AppErrorExceptionFilter)
export class UserattendController {
  constructor(private readonly userattendeesService: UserattendeesService) {}
  @Post()
  create(@Body() data: any) {
    return this.userattendeesService.createMany(data);
  }
  @Get('positionall')
  async getPositionAll() {
    return this.userattendeesService.getPositionAll();
  }
  @Get('courseall')
  async getCourseAll() {
    return this.userattendeesService.getCourseAll();
  }
  @Post('byuser')
  createMany(@Body() data: Prisma.userattendeesCreateManyInput) {
    return {
      result: this.userattendeesService.create(data),
    };
  }
  @Get()
  findAll() {
    return this.userattendeesService.findAll();
  }
  @Get(':roomid/:userid')
  async findbyid(
    @Param('roomid') roomid: string,
    @Param('userid') userid: string,
  ) {
    return this.userattendeesService.findbyid(roomid, userid);
  }
  @Get(':roomid')
  async findUserInroom(@Param('roomid') roomid: string) {
    return this.userattendeesService.findUserInroom(roomid);
  }

  @Post('userall')
  async getuserAll() {
    return await this.userattendeesService.getuserAll();
  }

  @Put()
  async update(
    @Body('roomid') roomid: string,
    @Body('userid') userid: string,
    @Body('status') status: boolean,
  ) {
    return this.userattendeesService.update(roomid, userid, status);
  }
  @Post('uploaduser')
  async updateUser(@Body('data') data: Prisma.listnameCreateManyInput) {
    return this.userattendeesService.importUser(data);
  }
  @Put('updatestatususer/:roomid/:userid')
  updateStatusUser(
    @Param('roomid') roomid: string,
    @Param('roomid') userId: string,
  ) {
    return this.userattendeesService.updateStatusUser(roomid, userId);
  }

  @Put('updateUserbyid/:userid')
  updateUserbyID(@Body('data') data: any, @Body('userid') userid: string) {
    return this.userattendeesService.updateUserbyID(data, userid);
  }
  @Post('import/position/:filetype')
  async importPosition(
    @Body('data') data: any,
    @Param('filetype') filetype: string,
  ) {
    return this.userattendeesService.importPosition(data, filetype);
  }
}
