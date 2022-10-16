import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@d-debt/share';
import helmet from 'helmet';

import { CoreModule } from './app.module';
// import { DebtService } from './debt/debt.service';

async function bootstrap() {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  const app = await NestFactory.create(CoreModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  // const debtService = app.get(DebtService);

  // void debtService.setExpire();
  app.listen(4000);
  // await app.listen(configService.get('port'), () => {
  //   console.log(`service start on port ${configService.get('port')}...`);
  // });
}
bootstrap();
