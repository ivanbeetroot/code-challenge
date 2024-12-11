import { Injectable } from '@nestjs/common';

@Injectable()
export class CountriesFetchService {
  getHello(): string {
    return 'Hello World!';
  }
}
