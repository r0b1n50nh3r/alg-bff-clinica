import jwt from 'jsonwebtoken';
import { usuarioToken } from '../clinica/models/usuario';

export const generaToken = async (user: usuarioToken, expiracion?: string) => {
    return jwt.sign({ user: user }, process.env.JWT_SECRETKEY, {
        expiresIn: expiracion || process.env.JWT_TOKEN_EXPIRES,
    });
};
