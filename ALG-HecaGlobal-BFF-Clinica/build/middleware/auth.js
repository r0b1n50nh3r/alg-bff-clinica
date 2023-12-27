"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = require("../helpers/token");
module.exports = (req, res, next) => {
    const bearerHeader = req.headers['Authorization'];
    let user;
    // Comprobar que existe el token
    if (!req.headers.authorization) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    }
    else {
        // Comrpobar la validez de este token
        let token = req.headers.authorization.split(" ")[1];
        // Comprobar la validez de este token
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRETKEY, (err, decoded) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
            }
            else {
                user = decoded.user;
                let newtoken = yield (0, token_1.generaToken)(user);
                res.setHeader('token', newtoken);
                next();
            }
        }));
    }
};
