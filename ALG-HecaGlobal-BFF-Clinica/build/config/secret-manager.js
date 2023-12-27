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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSecret = void 0;
const secret_manager_1 = require("@google-cloud/secret-manager");
const client = new secret_manager_1.SecretManagerServiceClient();
const getSecret = (secretName, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [version] = yield client.accessSecretVersion({
            name: `projects/${projectId}/secrets/${secretName}/versions/latest`, // enter the copied resource id here
        });
        const secret = JSON.parse(version.payload.data.toString());
        return secret;
    }
    catch (error) {
        error.name = 'SecretAccessError';
        console.error(error);
        throw error;
    }
});
exports.getSecret = getSecret;
