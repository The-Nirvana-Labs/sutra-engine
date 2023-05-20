import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export default (): DataSourceOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    // ssl: process.env.POSTGRES_SSL === 'true',
    ssl: {
        rejectUnauthorized: false,
    },

    synchronize: true,
    dropSchema: false,
    migrationsRun: false,
    logging: false,

    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../migrations/**/*{.ts,.js}')],
});
