import { NestFactory } from '@nestjs/core';
import { CountriesApiModule } from './countries-api.module';

async function bootstrap() {
  const app = await NestFactory.create(CountriesApiModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
