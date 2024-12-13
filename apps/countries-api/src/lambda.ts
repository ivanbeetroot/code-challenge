import { NestFactory } from '@nestjs/core';
import { CountriesApiModule } from './countries-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Handler, Context, Callback } from 'aws-lambda';
import * as serverless from 'serverless-http';

let server: Handler;

async function bootstrap() {
  const app = await NestFactory.create(CountriesApiModule);

  const config = new DocumentBuilder()
    .setTitle('Countries fetch API')
    .setDescription('The countries fetch API description')
    .addBearerAuth()
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.init(); // Required for serverless
  const expressApp = app.getHttpAdapter().getInstance();
  server = serverless(expressApp);
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  if (!server) {
    await bootstrap();
  }
  return server(event, context, callback);
};
