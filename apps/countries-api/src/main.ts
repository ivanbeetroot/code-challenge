import { NestFactory } from '@nestjs/core';
import { CountriesApiModule } from './countries-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(process.env.port ?? 3000);
}
bootstrap();
