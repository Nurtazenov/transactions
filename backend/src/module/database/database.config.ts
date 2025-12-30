import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import migrations from './migrations';

export const databaseOptions = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',

  host: config.get<string>('DB_HOST', 'localhost'),
  port: config.get<number>('DB_PORT', 5432),
  username: config.get<string>('DB_USER'),
  password: config.get<string>('DB_PASSWORD'),
  database: config.get<string>('DB_NAME'),

  logging: config.get<boolean>('DB_LOGGING', false),
  synchronize: false,

  migrations,
  migrationsRun: config.get<boolean>('DB_MIGRATIONS_RUN', false),
  migrationsTableName: config.get<string>(
    'DB_MIGRATIONS_TABLE_NAME',
    'database_migrations',
  ),

  autoLoadEntities: true,
});
