import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import migrations from './migrations';

export const databaseOptions = (
  config: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'postgres',
  url:process.env.DB_URL,
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
