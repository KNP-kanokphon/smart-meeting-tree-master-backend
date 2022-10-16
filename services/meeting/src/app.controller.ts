import { Controller, UseFilters, Get } from '@nestjs/common';
import { AppErrorExceptionFilter } from '@d-debt/share';
import { CoreService } from './app.service';
@UseFilters(AppErrorExceptionFilter)
@Controller('core')
export class CoreController {
  constructor(private readonly coreService: CoreService) {}

  @Get('/health')
  checkHealth() {
    return { uptime: process.uptime() };
  }
}
