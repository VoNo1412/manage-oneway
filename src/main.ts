import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { KafkaOptions, MicroserviceOptions } from '@nestjs/microservices';
import * as express from 'express';
import * as http from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import { kafkaOptions } from './common/config/configKafka';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
  const config = new DocumentBuilder()
    .setTitle('Manage Example API')
    .setDescription('The Manage API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );
  app.setGlobalPrefix('api')
  await app.init();
  http.createServer(server).listen(3000);
}
bootstrap();
