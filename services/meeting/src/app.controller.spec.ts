import { Test, TestingModule } from '@nestjs/testing';
import { CoreController } from './app.controller';
import { CoreService } from './app.service';

describe('CoreController', () => {
  let controller: CoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoreController],
      providers: [CoreService],
    }).compile();

    controller = module.get<CoreController>(CoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
