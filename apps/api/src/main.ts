import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { requestIdMiddleware } from './infra/request-id.middleware';
import { LoggingInterceptor } from './infra/logging.interceptor';
import { ZodValidationPipe } from './infra/zod-validation.pipe';
import { HttpErrorFilter } from './infra/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(requestIdMiddleware);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalFilters(new HttpErrorFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
