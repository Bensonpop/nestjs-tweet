import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as express from 'express'; 


async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter()); 
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
 
  console.log(`Application is Running on http://localhost:${port}`);
}


bootstrap();
