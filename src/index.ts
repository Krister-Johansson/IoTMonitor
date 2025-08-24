import 'dotenv/config';
import 'reflect-metadata';
import { AppDataSource } from './data-source.js';
import { app, PORT } from './app.js';

async function bootstrap() {
  try {
    await AppDataSource.initialize();
    await AppDataSource.synchronize();
    console.log('Data Source has been initialized');

    app.listen(PORT, () => {
      console.log(`🚀 IoT Monitor server listening on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
      console.log(`🌐 API endpoint: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Error during initialization:', error);
    throw error;
  }
}

bootstrap().catch(error => {
  console.error('Unhandled error during startup:', error);
  throw error;
});
