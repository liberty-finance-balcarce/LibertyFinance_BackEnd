import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages: string[] = [];

        for (const error of errors) {
          if (error.constraints) {
            messages.push(...Object.values(error.constraints));
          }
        }

        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: messages.join('. '),
        });
      },
    }),
  );

  app.setGlobalPrefix('api/v1');
  const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });
  const options = new DocumentBuilder()
    .setTitle('Liberty Finance')
    .setDescription('Tu camino a la libertad financiera.')
    .setVersion('1.0')
    .addTag('Endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/docs', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
