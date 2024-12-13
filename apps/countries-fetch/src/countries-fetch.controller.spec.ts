import { Test, TestingModule } from '@nestjs/testing';
import { CountriesFetchController } from './countries-fetch.controller';
import { CountriesFetchService } from './countries-fetch.service';

describe('CountriesFetchController', () => {
  let countriesFetchController: CountriesFetchController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CountriesFetchController],
      providers: [CountriesFetchService],
    }).compile();

    countriesFetchController = app.get<CountriesFetchController>(
      CountriesFetchController,
    );
  });
});
