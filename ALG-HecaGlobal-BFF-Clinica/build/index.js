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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions_1 = require("./swaggerOptions");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3500;
// middlewares
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ exposedHeaders: '*' }));
const specs = (0, swagger_jsdoc_1.default)(swaggerOptions_1.options);
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, config_1.setEnvConfig)();
    // Routes
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    app.use('/api/clinica', require('./clinica/routes/clinica'));
    //app.use(error404Handler);
    //app.use(errorHandler);
    app.listen(PORT, () => {
        console.log(`App listening on http://${process.env.HOST}:${process.env.PORT}`);
    });
}))();
