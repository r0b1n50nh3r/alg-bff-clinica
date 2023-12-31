
import crypto from 'crypto';

interface IConfig {
    algorithm?: string;
    encryptionKey?: string;
    salt?: string;
    iv?: Buffer;
}

export default class Encryption {

    private algorithm: string;
    private key: Buffer | string;
    private salt: string;
    private iv: Buffer | null;

    constructor(iconfig: IConfig) {
        this.algorithm = iconfig.algorithm || '';
        this.salt = iconfig.salt || '';
        // encode encryption key from utf8 to hex
        const ENCRYPTION_KEY = iconfig.encryptionKey ? Buffer.from(iconfig.encryptionKey).toString('hex') : '';
        // initialize key
        this.key = ENCRYPTION_KEY ? Buffer.from(ENCRYPTION_KEY, "hex") : '';
        // initialize IV
        this.iv = iconfig.iv || null;

        // validate missing config options
        if (!this.algorithm && !this.key) {
            throw Error('Configuration Error!');
        }
    }

    /**
     * Function to encrypt a string into a url slug
     */
    encrypt = (value: string, isInt: boolean = false): string => {

        // Validate missing value
        if (!value) {
            throw Error('A value is required!');
        }

        // Initialize Cipher instance
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);

        // Return Buffer as a binary encoded string
        let buffer = Buffer.from(value, 'utf8').toString("binary");

        // Support for small and big integers
        if (isInt) {
            // Set byte auto padding to false
            cipher.setAutoPadding(false);

            // allocate Buffer instance 8 bytes
            const buf = Buffer.allocUnsafe(8);

            // Write value to buf instance at the specified offset as big-endian.
            buf.writeBigUInt64BE(BigInt(value));

            // encode as binary
            buffer = buf.toString("binary");
        }

        // Get encrypted data from the cipher instance
        const firstPart = cipher.update(buffer, "binary", "base64");
        const finalPart = cipher.final("base64")

        // concat and return both parts
        return `${firstPart}${finalPart}`;
    }

    /**
     * Function to decrypt a url token
     */
    decrypt = (token: string, isInt: boolean = false): string => {

        // Validate missing token
        if (!token) {
            throw Error('A token is required!');
        }

        // Initialize Decipher instance
        const decipher = crypto.createDecipheriv(this.algorithm, this.key, this.iv);

        // Support for small and big integers
        if (isInt) {
            // Set byte auto padding to false
            decipher.setAutoPadding(false);
        }

        // encodes encrypted value from base64 to hex
        const buffer = Buffer.from(token, "base64").toString("hex");

        // Get decrypted data from decipher instance
        const firstPart = decipher.update(buffer, 'hex', 'base64');
        const finalPart = decipher.final('base64') || '';

        // concat both parts
        const decrypted = `${firstPart}${finalPart}`;

        // Encode decrypted value as a 64-bit Buffer
        const buf = Buffer.from(decrypted, "base64");

        // Support for small and big integers
        if (isInt) {
            // Reads an unsigned, big-endian 64-bit integer from buf at the specified offset
            // and returns as a string
            return buf.readBigUInt64BE(0).toString();
        }
        // convert decrypted value from base64 to utf-8 string
        return buf.toString('utf8');
    }

    /**
     * Function to compare a key
     */
    compare = (clave: string, hashclave: string ): boolean => {
        const iconfig = {
            algorithm: process.env.ALGORITHM,
            encryptionKey: process.env.ENCRYPTION_KEY,
            salt: process.env.SALT
        }
        
        const encryption = new Encryption(iconfig);

        let decryptClave = encryption.decrypt(hashclave);

        return clave === decryptClave;
    }

}