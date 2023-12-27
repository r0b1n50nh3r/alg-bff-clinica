"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "BFF Clínica",
            version: "1.0.0",
            description: "BFF Clínica",
        },
        servers: [
            {
                url: `http://${process.env.HOST}:${process.env.PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    in: "header",
                    bearerFormat: "JWT"
                }
            }
        }
    },
    security: [{
            bearerAuth: []
        }],
    apis: ["./src/clinica/routes/*.ts"],
    swagger: "2.0"
};
