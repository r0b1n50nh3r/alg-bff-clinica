import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { generaToken } from '../helpers/token'
import { usuarioToken } from '../clinica/models/usuario'

module.exports = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = <string>req.headers['Authorization'];
    let user: usuarioToken;
    // Comprobar que existe el token
    if (!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    }
    else {
        // Comrpobar la validez de este token
        let token = req.headers.authorization.split(" ")[1];
        // Comprobar la validez de este token
        jwt.verify(token, process.env.JWT_SECRETKEY, async (err, decoded: any) => {
            if (err) {
                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
            } else {
                user = decoded.user;
                let newtoken = await generaToken(user);
                res.setHeader('token', newtoken);
                next();
            }
        });
    }

};