import { Controller, Get } from '@nestjs/common';

@Controller()
export class CountriesFetchController {
  @Get('health')
  async healthCheck() {
    return { status: 'ok' };
  }
}
