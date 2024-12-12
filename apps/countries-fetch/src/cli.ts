import { NestFactory } from '@nestjs/core';
import { CountriesFetchModule } from './countries-fetch.module';
import { CommandModule, CommandService } from 'nestjs-command';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CountriesFetchModule, {
    logger: ['error', 'warn', 'debug', 'verbose'],
  });

  try {
    await app.select(CommandModule).get(CommandService).exec();
    await app.close();
  } catch (error) {
    console.error(error);
    await app.close();
    process.exit(1);
  }
}
bootstrap();
