import express, { Application } from 'express';
import cors from 'cors';
import { setEnvConfig } from './config/config';
import { error404Handler, errorHandler } from './middleware/handleerror';

// Swagger
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import { options } from './swaggerOptions';

const app = express();

const PORT = process.env.PORT || 3500;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ exposedHeaders: '*' }));
const specs = swaggerJsDoc(options);

(async () => {
    await setEnvConfig();
    // Routes
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
    app.use('/api/clinica', require('./clinica/routes/clinica'));
    //app.use(error404Handler);
    //app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`App listening on http://${process.env.HOST}:${process.env.PORT}`);
    });
})();
