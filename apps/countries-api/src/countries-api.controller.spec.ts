import { Test, TestingModule } from '@nestjs/testing';
import { CountriesApiController } from './countries-api.controller';
import { CountriesApiService } from './countries-api.service';

describe('CountriesApiController', () => {
  let countriesApiController: CountriesApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CountriesApiController],
      providers: [CountriesApiService],
    }).compile();

    countriesApiController = app.get<CountriesApiController>(CountriesApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(countriesApiController.getHello()).toBe('Hello World!');
    });
  });
});
