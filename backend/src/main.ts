import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port = config.get<number>('PORT', 3001);
  const host = config.get<string>('HOST', 'localhost');
  const prefix = config.get<string>('HTTP_PREFIX', 'api');

  app.setGlobalPrefix(prefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`${config.get('APP_NAME', 'Account')} microservice`)
    .setDescription('API Documentation')
    .addServer(`http://${host}:${port}${prefix}`)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(`${prefix}/docs`, app, document);

  await app.listen(port);
  console.log(`🚀 Server running on http://${host}:${port}${prefix}`);
}

bootstrap();
