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
import {
  UserService,
  UserPartyService,
  UserattendeesService,
} from './user.service';
import * as papa from 'papaparse';
import { AppErrorExceptionFilter } from '@d-debt/share';
import { Prisma } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
// const csv = require('csvtojson');
import { Express } from 'express';

@Controller('user')
@UseFilters(AppErrorExceptionFilter)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() data: Prisma.contactsCreateManyInput) {
    return this.userService.create(data);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('findbyid/:userid')
  findUser(@Param('userid') userid: any) {
    return this.userService.findUser(userid);
  }

  @Get('finduserbyid/:userid')
  findUserByID(@Param('userid') userid: any) {
    return this.userService.findUserByID(userid);
  }

  @Post('importuser')
  importusers(@Body() data: string[]) {
    return this.userService.importusers(data);
  }

  @Delete('delete/user/:uuid')
  async deleteUser(@Param('uuid') uuid: any) {
    return this.userService.deleteUser(uuid);
  }

  @Put('updateuser/:uuid')
  updateUser(@Body('data') data: any, @Param('uuid') uuid: string) {
    return this.userService.updateUser(uuid, data);
  }
}

@Controller('userparty')
@UseFilters(AppErrorExceptionFilter)
export class UserPartyController {
  constructor(private readonly userParty: UserPartyService) {}
  @Post()
  create(@Body() data: any) {
    return this.userParty.create(data);
  }
  @Get()
  findAll() {
    return this.userParty.findAll();
  }
  @Put('/:userid')
  update(@Param('userid') userid: string) {
    return {
      result: this.userParty.update(userid),
    };
  }
  @Put('/userin/:userid')
  updateuserparty(@Param('userid') userid: string) {
    return this.userParty.updateuserparty(userid);
  }
  @Get('/:userid')
  findUser(@Param('userid') userid: any) {
    return this.userParty.findUser(userid);
  }
  @Put('/recivegif/:userid')
  recivegif(@Param('userid') userid: string) {
    return this.userParty.recivegif(userid);
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
  @Get('userinroomall')
  async getUserInroomAll() {
    return this.userattendeesService.getUserInroomAll();
  }
  @Get('courseall')
  async getCourseAll() {
    return this.userattendeesService.getCourseAll();
  }

  @Get('groupalls')
  GroupAll() {
    return this.userattendeesService.GroupAll();
  }
  @Post('byuser')
  createMany(@Body() data: Prisma.userattendeesCreateManyInput) {
    return {
      result: this.userattendeesService.create(data),
    };
  }
  @Put('foodupdate/:roomid/:userid/:status')
  updateFood(
    @Param('roomid') roomid: any,
    @Param('userid') userid: any,
    @Param('status') status: boolean,
  ) {
    return {
      result: this.userattendeesService.updateFood(roomid, userid, status),
    };
  }
  @Delete('delete/position/:uuid')
  async deletePosition(@Param('uuid') uuid: any) {
    return this.userattendeesService.deletePosition(uuid);
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

  @Post('createuser')
  async createUserAdd(@Body('data') data: Prisma.listnameCreateManyInput) {
    return this.userattendeesService.createUserAdd(data);
  }

  @Get('updateUserbyid/:roomid')
  async finduserByidroom(@Param('roomid') roomid: string) {
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
  @Put('updateUserDetail/:roomid/:userid')
  updateUserDetail(
    @Body('data') data: any,
    @Param('roomid') roomid: string,
    @Param('userid') userid: string,
  ) {


    return this.userattendeesService.updateUserDetail(roomid, userid, data);
  }
  @Put('updateUserNoomeet/:roomid/:userid')
  updateUserNoMeet(
    @Body('data') data: any,
    @Param('roomid') roomid: string,
    @Param('userid') userid: string,
  ) {


    return this.userattendeesService.updateUserNoMeet(roomid, userid, data);
  }

  @Post('uploaduser')
  async updateUser(@Body('data') data: Prisma.listnameCreateManyInput) {
    return this.userattendeesService.importUser(data);
  }
  @Put('updatestatususer/:roomid/:userid')
  updateStatusUser(
    @Param('roomid') roomid: string,
    @Param('userid') userId: string,
  ) {
    return this.userattendeesService.updateStatusUser(roomid, userId);
  }

  @Put('updateUserbyid/:userid')
  updateUserbyID(@Body('data') data: any, @Param('userid') userid: string) {
    return this.userattendeesService.updateUserbyID(data, userid);
  }

  @Post('import/position/:filetype')
  async importPosition(
    @Body('data') data: any,
    @Param('filetype') filetype: string,
  ) {
    return this.userattendeesService.importPosition(data, filetype);
  }

  @Post('create/group')
  CreateGroup(@Body() data: any) {
    return this.userattendeesService.CreateGroup(data);
  }
  @Put('updateGroup/:uuid')
  UpdateGroup(@Body('data') data: any, @Param('uuid') uuid: string) {
    return this.userattendeesService.UpdateGroup(data, uuid);
  }
  @Delete('delete/group/:uuid')
  async DeleteGroup(@Param('uuid') uuid: any) {
    return this.userattendeesService.DeleteGroup(uuid);
  }
}
