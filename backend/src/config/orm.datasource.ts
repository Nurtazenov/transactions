import * as dotenv from 'dotenv'
import migrations from 'src/module/database/migrations';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

const ENV_FILE = `.env`;

dotenv.config({ path: ENV_FILE });

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  synchronize: false,
  entities: [User],
  migrations,
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
  migrationsTableName: 'database_migrations',
});

