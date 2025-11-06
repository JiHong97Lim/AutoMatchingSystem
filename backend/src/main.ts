import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  // ★ Fly에서 확실히 잡히게 host를 명시
  await app.listen(port, '0.0.0.0');
}
bootstrap();
