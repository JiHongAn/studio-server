import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionsFilter } from './libs/filters/http-exception.filter';
import { ResponseInterceptor } from './libs/interceptors/response.interceptor';
import { AppException } from './libs/exceptions/app.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      validationError: { target: false, value: false },
      exceptionFactory: () => {
        throw new AppException('INVALID_INPUT');
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((e) => {
  console.log(e);
});
