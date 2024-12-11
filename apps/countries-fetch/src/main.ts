import { NestFactory } from '@nestjs/core';
import { CountriesFetchModule } from './countries-fetch.module';

async function bootstrap() {
  const app = await NestFactory.create(CountriesFetchModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
