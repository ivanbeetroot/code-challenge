import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesApiService {
  getHello(): string {
    return 'Hello World!';
  }
}
