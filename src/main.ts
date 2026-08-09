import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 'loopback'); // Trust requests from the loopback address
  app.enableCors({
    origin: process.env.API_FRONT, // أو حط الدومين المسموح به
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });
  app.use(cookieParser());
  app.use(helmet());

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
