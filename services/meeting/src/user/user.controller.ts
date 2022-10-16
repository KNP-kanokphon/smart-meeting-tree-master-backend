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
} from '@nestjs/common';
import { UserService, UserattendeesService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import { AppErrorExceptionFilter } from '@d-debt/share';
import { Prisma } from '@prisma/client';

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
  create(@Body() data: Prisma.userattendeesCreateManyInput) {
    return this.userattendeesService.createMany(data);
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
  @Put()
  async update(
    @Body('roomid') roomid: string,
    @Body('userid') userid: string,
    @Body('status') status: boolean,
  ) {
    return this.userattendeesService.update(roomid, userid, status);
  }
}
