import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { SecretNames } from '../enums/secret-names.js';

const client = new SecretManagerServiceClient();

export const getSecret = async (secretName: SecretNames, projectId: string): Promise<any> => {
    try {
        const [version] = await client.accessSecretVersion({
            name: `projects/${projectId}/secrets/${secretName}/versions/latest`, // enter the copied resource id here
        });
        const secret = JSON.parse(version.payload!.data!.toString());
        return secret;
    } catch (error: any) {
        error.name = 'SecretAccessError';
        console.error(error);

        throw error;
    }
};
