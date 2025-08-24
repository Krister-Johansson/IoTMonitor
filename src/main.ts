import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('port') || 3000;
  const appName = configService.get<string>('app.name') || 'IoT Monitor';
  const environment = configService.get<string>('app.environment') || 'development';

  await app.listen(port);

  console.log('');
  console.log('🚀 IoT Monitor Application Started!');
  console.log('=====================================');
  console.log(`📱 Application: ${appName}`);
  console.log(`🌍 Environment: ${environment}`);
  console.log(`🌐 Application URL: http://localhost:${port}`);
  console.log(`🗄️  TimescaleDB: ${configService.get('database.host')}:${configService.get('database.port')}`);
  console.log(`🔴 Redis: ${configService.get('redis.host')}:${configService.get('redis.port')}`);
  console.log('=====================================');
  console.log('');
}

void bootstrap();
