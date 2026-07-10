import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://192.168.0.107:3000', 'http://localhost:3000', 'http://192.168.0.193:3000', 'http://192.168.0.103:3000']
  })
  app.use(cookieParser());

  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
  console.log('все збс')
}
bootstrap();
