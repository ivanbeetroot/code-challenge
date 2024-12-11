import { NestFactory } from '@nestjs/core';
import { CountriesFetchModule } from './countries-fetch.module';
import { CommandModule, CommandService } from 'nestjs-command';

async function bootstrap() {
  const isVerbose = process.argv.includes('--verbose');

  const app = await NestFactory.createApplicationContext(CountriesFetchModule, {
    logger: isVerbose
      ? ['error', 'warn', 'log', 'debug', 'verbose']
      : ['error', 'warn', 'log'],
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
