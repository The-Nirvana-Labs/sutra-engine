import { DataSourceOptions } from 'typeorm';
import dbConfig from './database';
import { readFileSync } from 'fs';

export interface iConfig {
    env: string;
    port: number;
    database: DataSourceOptions;
    keys: {
        privateKey: string;
        publicKey: string;
    };
}

export default (): Partial<iConfig> => {
    const privateKeyPath = process.env.PRIVATE_KEY_PATH;
    const publicKeyPath = process.env.PUBLIC_KEY_PATH;

    let publicKey, privateKey;
    if (publicKeyPath) {
        publicKey = readFileSync(publicKeyPath, 'utf8');
    }

    if (privateKeyPath) {
        privateKey = readFileSync(privateKeyPath, 'utf8');
    }

    const config = {
        env: process.env.NODE_ENV || 'development',
        port: parseInt(process.env.PORT, 10) || 3000,
        keys: {
            privateKey: privateKey || process.env.PRIVATE_KEY?.replace(/\\n/gm, '\n'),
            publicKey: publicKey || process.env.PUBLIC_KEY?.replace(/\\n/gm, '\n'),
        },
        database: dbConfig(),
    };
    return config;
};
