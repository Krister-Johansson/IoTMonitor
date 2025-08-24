import { DataSource, SimpleConsoleLogger } from 'typeorm';
import dotenv from 'dotenv';
import { Todo } from './entity/Todo.js';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env['POSTGRES_HOST'] || 'localhost',
  port: Number(process.env['POSTGRES_PORT']) || 5432,
  username: process.env['POSTGRES_USER'] || 'postgres',
  password: process.env['POSTGRES_PASSWORD'] || 'postgres',
  database: process.env['POSTGRES_DB'] || 'iotmonitor',
  synchronize: true,
  logger: new SimpleConsoleLogger(false),
  entities: [Todo],
  subscribers: [],
  migrations: [],
});
