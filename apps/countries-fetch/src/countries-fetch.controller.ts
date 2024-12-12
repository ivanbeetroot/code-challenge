import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';

@Controller()
export class CountriesFetchController {
  @Get('health')
  @ApiExcludeEndpoint()
  async healthCheck() {
    return { status: 'ok' };
  }
}
