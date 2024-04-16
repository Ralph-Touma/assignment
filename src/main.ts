import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,  
    forbidNonWhitelisted: true,  
    transform: true,  
    disableErrorMessages: false,  
  }));

  
  app.useGlobalFilters(new AllExceptionsFilter());  

  await app.listen(3000);  
}
bootstrap();
