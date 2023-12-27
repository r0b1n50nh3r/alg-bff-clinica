"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.setEnvConfig = exports.setConfig = void 0;
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
const secret_manager_1 = require("./secret-manager");
const secret_names_1 = require("../enums/secret-names");
dotenv.config({
    path: path_1.default.resolve(process.env.NODE_ENV + '.env'),
});
const setConfig = (config) => {
    process.env = Object.assign(Object.assign({}, process.env), config);
};
exports.setConfig = setConfig;
const setEnvConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    // cuando esta desplegado en App Engine, el proyecto viene en process.env.GOOGLE_CLOUD_PROJECT
    // si no, lee GCP_PROJECT desde el archivo .env
    const projectId = process.env.GOOGLE_CLOUD_PROJECT
        ? process.env.GOOGLE_CLOUD_PROJECT
        : process.env.GCP_PROJECT;
    const secrets = [
        secret_names_1.SecretNames.SENDGRID_CONFIG,
        secret_names_1.SecretNames.BFF_CLINICA_ROUTES,
        secret_names_1.SecretNames.CRYPTO_CONFIG,
        secret_names_1.SecretNames.JWT_CONFIG,
        secret_names_1.SecretNames.REGIONAL_CONFIG,
    ];
    const configs = yield Promise.all(secrets.map((secret) => (0, secret_manager_1.getSecret)(secret, projectId)));
    configs.forEach((config) => (0, exports.setConfig)(config));
    if (process.env.NODE_ENV === 'development') {
        process.env.HOST = 'localhost';
    }
});
exports.setEnvConfig = setEnvConfig;
