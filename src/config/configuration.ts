export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER || 'iot_user',
    password: process.env.POSTGRES_PASSWORD || 'iot_password',
    database: process.env.POSTGRES_DB || 'iot_monitor',
  },
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD || '',
  },
  app: {
    name: 'IoT Monitor',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },
});
