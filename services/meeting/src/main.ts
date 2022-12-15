import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { PrismaService } from '@d-debt/share';
import helmet from 'helmet';
import config from './configs';
import { CoreModule } from './app.module';

const PORT = config().port;

async function bootstrap() {
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };
  const app = await NestFactory.create(CoreModule);
  app.enableCors();
  app.use(helmet());
  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
  console.log(`service start on port : ${PORT}`);
}
bootstrap();
