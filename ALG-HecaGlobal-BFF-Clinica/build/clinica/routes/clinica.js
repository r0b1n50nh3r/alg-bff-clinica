"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clinica_1 = __importDefault(require("../controllers/clinica"));
// Middlewares
const auth = require('../../middleware/auth');
const router = (0, express_1.Router)();
/**
 * @swagger
 * components:
 *  schemas:
 *    listarestadocuota:
 *      type: object
 *      properties:
 *        idEstadoCuota:
 *          type: integer
 *          description: valor auto generado por la BDD de 1 en 1
 *        descripcion:
 *          type: string
 *          description: Nombre del usuario
 *
 *      example:
 *        usuarioid: 1
 *        nombre: 'Robinson Hernandez'
 *        correo: 'abcde@abc.cl'
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Usuario no funciona
 *
 *  parameters:
 *    usuarioid:
 *      in: path
 *      name: usuarioId
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/listarestadocuota:
 *  get:
 *    summary: Retorna lista completa de listarestadocuota
 *    tags: [clinica]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: lista completa de estadosCuotas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/listarestadocuota'
 */
router.get('/listarestadocuota', auth, clinica_1.default.listarestadocuota);
/**
* @swagger
* components:
*  schemas:
*    listarestadofinanciamientosuperior:
*      type: object
*      properties:
*        idestadofinanciamiento:
*          type: SMALLINT
*          description: ID estado financiamiento
*        descripcion:
*          type: STRING
*          description: Descripcion estado financiamiento
*        idestadosuperior:
*          type: SMALLINT
*          description: ID estado superior (asociado al ID estado financiamiento)
*        idestado:
*          type: STRING
*          description: ID estado
*    TaskNotFound:
*      type: object
*      properties:
*        message:
*          type: string
*          description: Error de mensaje expuesto al listar estado financiamiento superior
*      example:
*        message: Listado estado financiamiento superior no funciona
*/
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/listarestadofinanciamientosuperior:
 *  get:
 *    summary: Retorna lista completa de estado financiamiento superior
 *    tags: [clinica]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: lista completa de estado financiamiento superior
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/listarestadofinanciamientosuperior'
 */
router.get('/listarestadofinanciamientosuperior', auth, clinica_1.default.listarestadofinanciamientosuperior);
/**
* @swagger
* components:
*  schemas:
*    obtenerarchivo:
*      type: object
*      properties:
*        nombrearchivo:
*          type: STRING
*          description: Nombre del archivo
*        rutpagador:
*          type: STRING
*          description: Rut pagador
*        idtratamiento:
*          type: SMALLINT
*          description: ID tratamiento
*        tipoarchivo:
*          type: STRING
*          description: Tipo archivo
*      example:
*        nombrearchivo: '/alg-bucket-publico/documentos-cl/Pagare005_20220908_115326.txt'
*        rutpagador: '183838358'
*        idtratamiento: 47
*        tipoarchivo: 1
*    TaskNotFound:
*      type: object
*      properties:
*        message:
*          type: string
*          description: Error de mensaje expuesto al obtener archivo
*      example:
*        message: Guardar archivo no funciona
*/
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/obtenerarchivo:
 *  post:
 *    summary: Obtener archivo
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/obtenerarchivo'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Obtener archivo correcta
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/obtenerarchivo'
 *      500:
 *        description: Error interno
 *
 */
router.post('/obtenerarchivo', auth, clinica_1.default.obtenerarchivo);
/**
 * @swagger
 * components:
 *  schemas:
 *    listarproductogarantia:
 *      type: object
 *      properties:
 *        idEstadoCuota:
 *          type: integer
 *          description: valor auto generado por la BDD de 1 en 1
 *        descripcion:
 *          type: string
 *          description: Nombre del usuario
 *
 *      example:
 *        usuarioid: 1
 *        nombre: 'Robinson Hernandez'
 *        correo: 'abcde@abc.cl'
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Usuario no funciona
 *
 *  parameters:
 *    usuarioid:
 *      in: path
 *      name: usuarioId
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/listarproductogarantia:
 *  get:
 *    summary: Retorna lista completa de listarproductogarantia
 *    tags: [clinica]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: lista completa de estadosCuotas
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/listarproductogarantia'
 */
router.get('/listarproductogarantia', auth, clinica_1.default.listarproductogarantia);
/**
 * @swagger
 * components:
 *  schemas:
 *    listarestadofinanciamiento:
 *      type: object
 *      properties:
 *        idEstadoCuota:
 *          type: integer
 *          description: valor auto generado por la BDD de 1 en 1
 *        descripcion:
 *          type: string
 *          description: listar estado financiamiento
 *
 *      example:
 *        usuarioid: 1
 *        nombre: 'Robinson Hernandez'
 *        correo: 'abcde@abc.cl'
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Usuario no funciona
 *
 *  parameters:
 *    usuarioid:
 *      in: path
 *      name: usuarioId
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/listarestadofinanciamiento:
 *  get:
 *    summary: Retorna  listar estado financiamiento
 *    tags: [clinica]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: lista completa listarestadofinanciamiento
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/listarestadofinanciamiento'
 */
router.get('/listarestadofinanciamiento', auth, clinica_1.default.listarestadofinanciamiento);
/**
 * @swagger
 * components:
 *  schemas:
 *    crearfinanciamiento:
 *      type: object
 *      properties:
 *        idclinica:
 *          type: INTEGER
 *          description: ID clinica
 *        rutPaciente:
 *          type: STRING
 *          description: Rut paciente
 *        numeroPaciente:
 *          type: INTEGER
 *          description: Número paciente
 *        nombrePaciente:
 *          type: STRING
 *          description: Nombre paciente
 *        apellidoPaciente:
 *          type: STRING
 *          description: Apellido paciente
 *        emailPaciente:
 *          type: STRING
 *          description: Email paciente
 *        rutPagador:
 *          type: STRING
 *          description: Rut pagador
 *        emailPagador:
 *          type: STRING
 *          description: Email pagador
 *        idProductoGarantia:
 *          type: SMALLINT
 *          description: ID producto garantía
 *        idDoctor:
 *          type: STRING
 *          description: Id doctor
 *        duracionTratamiento:
 *          type: SMALLINT
 *          description: Duración tratamiento
 *        montoTratatamiento:
 *          type: STRING
 *          description: Monto tratamiendo
 *        montoPagoInicial:
 *          type: STRING
 *          description: Monto pago inicial
 *        financiamientoASolicitar:
 *          type: STRING
 *          description: Financiamiento a solicitar
 *        pacientePagador:
 *          type: SMALLINT
 *          description: paciente igual pagador
 *        nombreOrtodoncista:
 *          type: STRING
 *          description: Nombre ortodoncista
 *        telefonoPaciente:
 *          type: STRING
 *          description: Telefono paciente
 *      example:
 *        idclinica: 2
 *        rutPaciente: '183838358'
 *        numeroPaciente: 2
 *        nombrePaciente: ''
 *        apellidoPaciente: ''
 *        emailPaciente: 'joselatorre@gmail.com'
 *        rutPagador: '183838358'
 *        emailPagador: 'joselatorre@gmail.com'
 *        idProductoGarantia: 2
 *        idDoctor: '2929'
 *        duracionTratamiento: 7
 *        montoTratatamiento: '1200000'
 *        montoPagoInicial: '200000'
 *        financiamientoASolicitar: '1400000'
 *        pacientePagador: 1
 *        nombreOrtodoncista: 'Roberto Bolaños'
 *        telefonoPaciente: '56975778909'
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Crear nuevo financiamiento
 *
 *  parameters:
 *    idusuario:
 *      in: path
 *      name: idusuario
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * /api/clinica/crearfinanciamiento:
 *  post:
 *    summary: Crear nuevo financiamiento
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/crearfinanciamiento'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: usuario creado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/crearfinanciamiento'
 *      500:
 *        description: Error interno
 *
 */
router.post('/crearfinanciamiento', auth, clinica_1.default.crearfinanciamiento);
/**
 * @swagger
 * components:
 *  schemas:
 *    listarfinanciamientosproceso:
 *      type: object
 *      properties:
 *        idclinica:
 *          type: STRING
 *          description: id clinica
 *      example:
 *        idclinica: 1
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Valida Usuario no funciona
 *
 *  parameters:
 *    idusuario:
 *      in: path
 *      name: idusuario
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * /api/clinica/listarfinanciamientosproceso:
 *  post:
 *    summary: lista todos los financiamientos
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/listarfinanciamientosproceso'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: usuario creado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/listarfinanciamientosproceso'
 *      500:
 *        description: Error interno
 *
 */
router.post('/listarfinanciamientosproceso', auth, clinica_1.default.listarfinanciamientosproceso);
/**
 * @swagger
 * components:
 *  schemas:
 *    obtenerdatostratamiento:
 *      type: object
 *      properties:
 *        idusuario:
 *          type: STRING
 *          description: ID Usuario
 *        idclinica:
 *          type: STRING
 *          description: ID Clinica
 *        idpaciente:
 *          type: INTEGER
 *          description: ID Paciente
 *        idtratamiento:
 *          type: SMALLINT
 *          description: ID Tratamiento
 *      example:
 *        idusuario: 'joanaprado@gmail.com'
 *        idclinica: '2'
 *        idpaciente: 6
 *        idtratamiento: 5
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Valida Usuario no funciona
 *
 *  parameters:
 *    idusuario:
 *      in: path
 *      name: idusuario
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * /api/clinica/obtenerdatostratamiento:
 *  post:
 *    summary: Obtiene datos del tratamiento
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/obtenerdatostratamiento'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: respuesta Ok
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/obtenerdatostratamiento'
 *      500:
 *        description: Error interno
 *
 */
router.post('/obtenerdatostratamiento', auth, clinica_1.default.obtenerdatostratamiento);
/**
 * @swagger
 * components:
 *  schemas:
 *    listarenproceso:
 *      type: object
 *      properties:
 *        idclinica:
 *          type: STRING
 *          description: id clinica
 *      example:
 *        idclinica: 1
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Valida Usuario no funciona
 *
 *  parameters:
 *    idusuario:
 *      in: path
 *      name: idusuario
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * /api/clinica/listarenproceso:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: listar en financiamientos en proceso
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/listarenproceso'
 *    responses:
 *      200:
 *        description: usuario creado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/listarenproceso'
 *      500:
 *        description: Error interno
 *
 */
router.post('/listarenproceso', auth, clinica_1.default.listarenproceso);
/**
 * @swagger
 * components:
 *  schemas:
 *    listarconfinanciamiento:
 *      type: object
 *      properties:
 *        idclinica:
 *          type: STRING
 *          description: id clinica
 *      example:
 *        idclinica: 1
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Valida Usuario no funciona
 *
 *  parameters:
 *    idusuario:
 *      in: path
 *      name: idusuario
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * /api/clinica/listarconfinanciamiento:
 *  post:
 *    summary: Lista tratamientos con financiamiento
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/listarconfinanciamiento'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: usuario creado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/listarconfinanciamiento'
 *      500:
 *        description: Error interno
 *
 */
router.post('/listarconfinanciamiento', auth, clinica_1.default.listarconfinanciamiento);
/**
* @swagger
* components:
*  schemas:
*    actualizarnotainterna:
*      type: object
*      properties:
*        idtratamiento:
*          type: STRING
*          description: ID tratamiento
*        textonotainterna:
*          type: STRING
*          description: Texto nota interna
*      example:
*        idtratamiento: '5'
*        textonotainterna: 'agregar texto'
*    TaskNotFound:
*      type: object
*      properties:
*        message:
*          type: string
*          description: Error de mensaje expuesto a la ediion nota interna
*      example:
*        message: Actualizar nota interna no funciona
*/
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/actualizarnotainterna:
 *  put:
 *    summary: Actualiza nota interna tratamiento
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/actualizarnotainterna'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Actualizacion nota interna correcta
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/actualizarnotainterna'
 *      500:
 *        description: Error interno
 *
 */
router.put('/actualizarnotainterna', auth, clinica_1.default.actualizarnotainterna);
/**
 * @swagger
 * components:
 *  schemas:
 *    obtenerrutaarchivo:
 *      type: object
 *      properties:
 *        rutpagador:
 *          type: STRING
 *          description: Rut pagador
 *        idfinanciamiento:
 *          type: STRING
 *          description: ID financiamiento
 *        tipoarchivo:
 *          type: STRING
 *          description: Tipo archivo
 *      example:
 *        rutpagador: '183838358'
 *        idfinanciamiento: '4'
 *        tipoarchivo: '2'
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto a obtencion de ruta de archivo
 *      example:
 *        message: Obtener ruta archivo no funciona
 */
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/obtenerrutaarchivo:
 *  post:
 *    summary: Obtiene ruta del archivo del documento
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/obtenerrutaarchivo'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Obtencion ruta del archivo correcta
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/obtenerrutaarchivo'
 *      500:
 *        description: Error interno
 *
 */
router.post('/obtenerrutaarchivo', auth, clinica_1.default.obtenerrutaarchivo);
/**
* @swagger
* components:
*  schemas:
*    usuario:
*      type: object
*      properties:
*        usuarioid:
*          type: integer
*          description: valor auto generado por la BDD de 1 en 1
*        nombre:
*          type: string
*          description: Nombre del usuario
*        correo:
*          type: string
*          description: Correo del usuario
*      example:
*        usuarioid: 1
*        nombre: 'Robinson Hernandez'
*        correo: 'abcde@abc.cl'
*    TaskNotFound:
*      type: object
*      properties:
*        message:
*          type: string
*          description: Error de mensaje expuesto al cliente
*      example:
*        message: Usuario no funciona
*
*  parameters:
*    usuarioid:
*      in: path
*      name: usuarioId
*      required: true
*      schema:
*        type: string
*      description: Id usuario
*/
/**
 * @swagger
 * tags:
 *  name: usuario
 *  description: EndPoint de usuario
 */
/**
 * @swagger
 * /api/clinica/usuario/getUsuarios:
 *  get:
 *    summary: Retorna lista completa de usuarios
 *    tags: [usuario]
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: lista completa de usuarios
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/usuario'
 */
router.get('/usuario/getUsuarios', auth, clinica_1.default.getUsuarios);
/**
 * @swagger
 * components:
 *  schemas:
 *    validaringresousuario:
 *      type: object
 *      properties:
 *        correo:
 *          type: STRING
 *          description: correo del usuario
 *        clave:
 *          type: STRING
 *          description: clave del usuario
 *      example:
 *        correo: "juanbaez@gmail.com"
 *        clave: "123"
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto al cliente
 *      example:
 *        message: Valida Usuario no funciona
 *
 *  parameters:
 *    idusuario:
 *      in: path
 *      name: idusuario
 *      required: true
 *      schema:
 *        type: string
 *      description: Id usuario
 */
/**
 * @swagger
 * /api/clinica/usuario/validaringresousuario:
 *  post:
 *    summary: Valida ingreso usuario
 *    tags: [usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/validaringresousuario'
 *    responses:
 *      200:
 *        description: usuario creado correctamente
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/validaringresousuario'
 *      500:
 *        description: Error interno
 *
 */
router.post('/usuario/validaringresousuario', clinica_1.default.validaringresousuario);
/**
 * @swagger
 * components:
 *  schemas:
 *    obtenerclaveusuario:
 *      type: object
 *      properties:
 *        correo:
 *          type: STRING
 *          description: Rut pagador
 *        nombre:
 *          type: STRING
 *          description: Nombre pagador
 *      example:
 *        correo: 'joanaprado@gmail.com'
 *        nombre: 'Joana Prado'
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto a obtencion de clave
 *      example:
 *        message: Obtener clave no funciona
 */
/**
 * @swagger
 * tags:
 *  name: usuario
 *  description: EndPoint de usuario
 */
/**
 * @swagger
 * /api/clinica/usuario/obtenerclaveusuario:
 *  post:
 *    summary: Obtiene clave
 *    tags: [usuario]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/obtenerclaveusuario'
 *    responses:
 *      200:
 *        description: Obtencion clave correcta
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/obtenerclaveusuario'
 *      500:
 *        description: Error interno
 *
 */
router.post('/usuario/obtenerclaveusuario', clinica_1.default.obtenerclaveusuario);
/**
 * @swagger
 * components:
 *  schemas:
 *    enviarcorreoregistro:
 *      type: object
 *      properties:
 *        templateId:
 *          type: STRING
 *          description: Id. de plantilla de correo
 *        to:
 *          type: STRING
 *          description: Correo destino
 *        nombre:
 *          type: STRING
 *          description: Nombre a quine va dirigido para completar la plantilla
 *        pagador:
 *          type: STRING
 *          description: Nombre apagador
 *        paciente:
 *          type: STRING
 *          description: Nombre paciente
 *        codigo:
 *          type: STRING
 *          description: codigo
 *      example:
 *        templateId: 'd-721fd86c0a4c449ba0fdede85249ce'
 *        to: 'correodestino@gmail.com'
 *        nombre: 'Claudio Andres Bravo'
 *        pagador: 'Claudio Andres Bravo'
 *        paciente: 'Claudio Andres Bravo'
 *        codigo: '12345'
 *    TaskNotFound:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          description: Error de mensaje expuesto a obtencion de ruta de archivo
 *      example:
 *        message: Obtener ruta archivo no funciona
 */
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/enviarcorreoregistro:
 *  post:
 *    summary: Obtiene ruta del archivo del documento
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/enviarcorreoregistro'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Obtencion ruta del archivo correcta
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/enviarcorreoregistro'
 *      500:
 *        description: Error interno
 *
 */
//router.post('/enviarcorreoregistro', controller.enviarcorreoregistro);
/**
* @swagger
* components:
*  schemas:
*    generarpagare:
*      type: object
*      properties:
*        rutpagador:
*          type: STRING
*          description: Rut pagador
*        idtratamiento:
*          type: INTEGER
*          description: ID tratamiento
*      example:
*        rutpagador: '183838564'
*        idtratamiento: 5
*    TaskNotFound:
*      type: object
*      properties:
*        message:
*          type: string
*          description: Error de mensaje expuesto a la generacion de pagare
*      example:
*        message: Creacion pagare no funciona
*/
/**
 * @swagger
 * tags:
 *  name: clinica
 *  description: EndPoint de clinica
 */
/**
 * @swagger
 * /api/clinica/generarpagare:
 *  post:
 *    summary: Creacion pagare
 *    tags: [clinica]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/generarpagare'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Creacion pagare correcta
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/generarpagare'
 *      500:
 *        description: Error interno
 *
 */
router.post('/generarpagare', auth, clinica_1.default.generarPagare);
module.exports = router;
