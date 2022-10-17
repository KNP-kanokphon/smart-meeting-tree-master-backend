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
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { AppErrorExceptionFilter } from '@d-debt/share';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';

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
  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File): Promise<any> {
    console.log(file);
    fs.createWriteStream(path).write(buffer);
    // const foo = papa.parse(file.buffer.toString('utf-8'), {
    //   delimiter: ',',
    //   header: true,
    //   skipEmptyLines: true,
    // }) as any;
    // const dataCsv = await csv().fromString(file.buffer.toString('utf-8'));
    // // console.log(dataCsv);
    // const result = await this.DebtService.importWrapup(
    //   dataCsv,
    //   foo.meta.fields,
    // );
    // return { result };
  }
}
