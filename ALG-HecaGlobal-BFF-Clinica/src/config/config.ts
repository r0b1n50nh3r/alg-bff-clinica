import * as dotenv from 'dotenv';
import path from 'path';
import { getSecret } from './secret-manager';
import { SecretNames } from '../enums/secret-names';
import {
    SendgridConfigSecret,
    BffClinicaRoutesSecret,
    CryptoConfigSecret,
    JwtConfigSecret,
    AllSecrets,
    RegionalConfigSecret,
} from '../interfaces/secrets';

declare global {
    namespace NodeJS {
        interface ProcessEnv extends AllSecrets {}
    }
}

dotenv.config({
    path: path.resolve(process.env.NODE_ENV + '.env'),
});

type SecretConfig = SendgridConfigSecret | BffClinicaRoutesSecret | CryptoConfigSecret | JwtConfigSecret | RegionalConfigSecret;

export const setConfig = (config: SecretConfig) => {
    process.env = { ...process.env, ...config };
};

export const setEnvConfig = async () => {
    // cuando esta desplegado en App Engine, el proyecto viene en process.env.GOOGLE_CLOUD_PROJECT
    // si no, lee GCP_PROJECT desde el archivo .env
    const projectId = process.env.GOOGLE_CLOUD_PROJECT
        ? (process.env.GOOGLE_CLOUD_PROJECT as string)
        : (process.env.GCP_PROJECT as string);

    const secrets = [
        SecretNames.SENDGRID_CONFIG,
        SecretNames.BFF_CLINICA_ROUTES,
        SecretNames.CRYPTO_CONFIG,
        SecretNames.JWT_CONFIG,
        SecretNames.REGIONAL_CONFIG,
    ];

    const configs = await Promise.all(secrets.map((secret) => getSecret(secret, projectId)));
    configs.forEach((config) => setConfig(config));

    if (process.env.NODE_ENV === 'development') {
        process.env.HOST = 'localhost';
    }
};
