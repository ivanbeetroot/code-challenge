import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}

dotenvConfig({ path: ['.env', '../.env', '../../.env', '../../../.env'] });

const config = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: `${process.env.DATABASE_PORT}`,
  username: `${process.env.DATABASE_USER}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ['dist/libs/database/entities/*.entity{.ts,.js}'],
  migrations: [
    'libs/database/src/migrations/*{.ts,.js}',
    'dist/libs/database/migrations/*{.ts,.js}',
  ],
  autoLoadEntities: true,
  logging: process.env.DATABASE_LOGGING === 'true',
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
};

export default registerAs('database', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
