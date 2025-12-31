import * as dotenv from 'dotenv'
import migrations from 'src/module/database/migrations';
import { User } from 'src/user/entities/user.entity';
import { DataSource } from 'typeorm';

const ENV_FILE = `.env`;

dotenv.config({ path: ENV_FILE });

export default new DataSource({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [User],
    migrations,
    migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true',
    migrationsTableName:'database_migrations'
})

