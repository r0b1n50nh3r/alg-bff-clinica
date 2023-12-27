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
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("../../helpers/crypto"));
const token_1 = require("../../helpers/token");
//import { tipoarchivo } from '../../enums/tipoarchivo';
const fs = require("fs");
const pdf = require("html-pdf-node");
const path = require("path");
const convertir = require('numero-a-letras');
const moment = require('moment');
const rut = require('rut-formatter');
var urlServicioClinica = String(process.env.URL_BASE_SERVICIO_CLINICA);
var urlServicioCorreo = String(process.env.URL_BASE_SERVICIO_CORREO);
var pagadorIgualPaciente = String(process.env.Sendgrid_TmpId_CreacionCuenta1);
var pagadorDiferentePaciente = String(process.env.Sendgrid_TmpId_CreacionCuenta2);
var recuperarContrasenaCorreo = String(process.env.Sendgrid_TmpId_RecuperarClave);
var urlCreaFinanciamiento = String(process.env.CREARFINANCIAMIENTO);
var urlCreaCuenta = String(process.env.URL_BASE_CREAR_CUENTA);
var urlServicioUsuario = String(process.env.URL_BASE_SERVICIO_USUARIO);
var urlServicioObtenerArchivo = String(process.env.URL_BASE_SERVICIO_OBTENER_ARCHIVO);
var urlServicioEliminarArchivo = String(process.env.ELIMINARARCHIVOSSTORAGE);
var carpetabucket = String(process.env.CARPETABUCKET);
let _pais = String(process.env.PAIS_CODE);
var urlServicioArchivo = String(process.env.URL_BASE_SERVICIO_ARCHIVO);
const iconfig = {
    algorithm: process.env.ALGORITHM,
    encryptionKey: process.env.ENCRYPTION_KEY,
    salt: process.env.SALT
};
const encryption = new crypto_1.default(iconfig);
class Controller {
    constructor() {
        this.listarestadocuota = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield axios_1.default.get(urlServicioClinica + String(process.env.ESTADOSCUOTAS));
                let estadosCuotas = result.data;
                res.status(200).json(estadosCuotas);
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.listarestadofinanciamiento = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield axios_1.default.get(urlServicioClinica + String(process.env.ESTADOSFINANCIAMIENTOS));
                let objlista = result.data.data;
                let listaEstados = objlista.map(function (data) {
                    const estados = {
                        idEstadoFinanciamiento: data.idestadofinanciamiento,
                        descripcion: data.descripcion
                    };
                    return estados;
                });
                res.status(200).json({ status: result.data.status, message: result.data.message, data: listaEstados });
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.listarestadofinanciamientosuperior = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield axios_1.default.get(urlServicioClinica + String(process.env.LISTARESTADOSFINANCIAMIENTOSUPERIOR));
                let objlista = result.data.data;
                let listaEstados = objlista.map(function (data) {
                    const estados = {
                        idEstadoFinanciamiento: data.idestadofinanciamiento,
                        descripcion: data.descripcion
                    };
                    return estados;
                });
                res.status(200).json({ status: result.data.status, message: result.data.message, data: listaEstados });
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.listarproductogarantia = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield axios_1.default.get(urlServicioClinica + String(process.env.PRODUCTOGARANTIA));
                let objlista = result.data.data;
                let productosGarantias = objlista.map(function (data) {
                    const estados = {
                        idProductoGarantia: data.idproductogarantia,
                        descripcion: data.descripcion
                    };
                    return estados;
                });
                res.status(200).json({ status: result.data.status, message: result.data.message, data: productosGarantias });
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.listarenproceso = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idclinica = req.body.idclinica;
            try {
                let result = yield axios_1.default.post(urlServicioClinica + String(process.env.LISTAFINANCIAMIENTOS), {
                    idclinica: idclinica
                });
                if (result.data.status == 200) {
                    let objlista = result.data.data;
                    let enProceso = objlista.map(function (data) {
                        const proceso = {
                            nombrePaciente: ` ${data.nombres} ${data.apellidos}`,
                            rutPaciente: data.rutpaciente,
                            numeroPaciente: data.numeropaciente,
                            idtratamiento: data.idtratamiento,
                            numeroTratamiento: data.numerotratamiento,
                            idDoctor: data.iddoctor,
                            idEstadoCuota: data.idestadocuota,
                            fechaSolicitud: data.fechasolicitud,
                            idestadofinanciamie: data.idestadofinanciamiento,
                            idPaciente: data.idpaciente,
                            descripcionEstadoCuota: data.descripcioncuota,
                            descEstadoFinanciamiento: data.descripcionfinanciamiento,
                            idUsuario: data.idusuario,
                            rutpagador: data.rutpagador,
                            idestadosuperior: data.idestadosuperior,
                            descripcionetapa: data.descripcionetapa,
                            necesitacodeudor: data.necesitacodeudor,
                            rutapagare: data.rutapagare,
                            rutacarnetpagador: data.rutacarnetpagador,
                            rutacarnetcodeudor: data.rutacarnetcodeudor,
                            impresopagare: data.impresopagare,
                            impresocarnetpagador: data.impresocarnetpagador,
                            impresocarnetcodeudor: data.impresocarnetcodeudor
                        };
                        return proceso;
                    }).filter((n) => n.idestadofinanciamie < 600);
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: enProceso });
                }
                else {
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
                }
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.listarconfinanciamiento = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idclinica = req.body.idclinica;
            try {
                let result = yield axios_1.default.post(urlServicioClinica + String(process.env.LISTAFINANCIAMIENTOS), {
                    idclinica: idclinica
                });
                if (result.data.status == 200) {
                    let objlista = result.data.data;
                    let enProceso = objlista.map(function (data) {
                        const proceso = {
                            nombrePaciente: ` ${data.nombres} ${data.apellidos}`,
                            rutPaciente: data.rutpaciente,
                            numeroPaciente: data.numeropaciente,
                            idtratamiento: data.idtratamiento,
                            numeroTratamiento: data.numerotratamiento,
                            idDoctor: data.iddoctor,
                            idestadofinanciamie: data.idestadofinanciamiento,
                            idPaciente: data.idpaciente,
                            fechaAprobacion: data.fechaaprobacion,
                            descripcionEstadoCuota: data.descripcioncuota,
                            descEstadoFinanciamiento: data.descripcionfinanciamiento,
                            idUsuario: data.idusuario
                        };
                        return proceso;
                    }).filter((n) => n.idestadofinanciamie === 700);
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: enProceso });
                }
                else {
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
                }
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.listarfinanciamientosproceso = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idclinica = req.body.idclinica;
            try {
                let result = yield axios_1.default.post(urlServicioClinica + String(process.env.LISTAFINANCIAMIENTOS), {
                    idclinica: idclinica
                });
                if (result.data.status == 200) {
                    let objlista = result.data.data;
                    let enProceso = objlista.map(function (data) {
                        const proceso = {
                            nombrePaciente: ` ${data.nombres} ${data.apellidos}`,
                            rutPaciente: data.rutpaciente,
                            numeroPaciente: data.numeropaciente,
                            numeroTratamiento: data.numerotratamiento,
                            idDoctor: data.iddoctor,
                            fechaSolicitud: data.fechasolicitud,
                            idestadofinanciamie: data.idestadofinanciamiento,
                            idPaciente: data.idpaciente,
                            fechaAprobacion: data.fechaaprobacion,
                            descripcionEstadoCuota: data.descripcioncuota,
                            descEstadoFinanciamiento: data.descripcionfinanciamiento,
                            idUsuario: data.idusuario,
                            rutaPagare: data.rutapagare
                        };
                        return proceso;
                    });
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: enProceso });
                }
                else {
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
                }
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.obtenerdatostratamiento = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idclinica = req.body.idclinica;
            let idusuario = req.body.idusuario;
            let idpaciente = req.body.idpaciente;
            let idtratamiento = req.body.idtratamiento;
            try {
                let result = yield axios_1.default.post(urlServicioClinica + String(process.env.OBTENERDATOSTRATAMIENTO), {
                    idclinica: idclinica,
                    idusuario: idusuario,
                    idpaciente: idpaciente,
                    idtratamiento: idtratamiento
                });
                if (result.data.status == 200) {
                    let objResultado = result.data.data;
                    let datosTratamiento = objResultado.map(function (data) {
                        const tratamiento = {
                            nombrePaciente: ` ${data.nombrespaciente} ${data.apellidospaciente}`,
                            rutPaciente: data.rutpaciente,
                            numeroPaciente: data.numeropaciente,
                            telefonoPaciente: data.telefonopaciente != null ? data.telefonopaciente : '',
                            emailPaciente: data.emailpaciente,
                            numeroTratamiento: data.numerotratamiento,
                            idDoctor: data.iddoctor,
                            idTratamiento: data.idtratamiento,
                            mesesTratamiento: data.mesestratamiento,
                            fechaEscaneo: data.fechaescaneo,
                            nombrePagador: data.rutpagador === data.rutpaciente ? ` ${data.nombrespaciente} ${data.apellidospaciente}` : ` ${data.nombrespagador} ${data.apellidospagador}`,
                            rutPagador: data.rutpagador,
                            correoPagador: data.emailpagador,
                            telefonoPagador: data.telefonopagador != null ? data.telefonopagador : '',
                            direccionPagador: data.direccion != null ?
                                data.adicionaldireccion != null ?
                                    `${data.direccion} ${data.adicionaldireccion},${data.comunapagador}`
                                    : `${data.direccion},${data.comunapagador}`
                                : ``,
                            montoSolicitado: data.montosolicitado,
                            pagoInicialSolicitado: data.pagoinicialsolicitado,
                            mesesSolicitado: data.mesessolicitado,
                            fechaSolicitud: data.fechasolicitud,
                            montoPostevaluacion: data.montopostevaluacion,
                            pagoInicialPostevaluacion: data.pagoinicialpostevaluacion,
                            montoCuotaPostevaluacion: data.montocuotapostevaluacion != null ? data.montocuotapostevaluacion : "0",
                            numeroCuotasPostevaluacion: data.numerocuotaspostevaluacion,
                            totalAPagarPostevaluacion: data.totalapagarpostevaluacion,
                            notaInterna: data.notainterna,
                            descEstadoCuota: data.descripcioncuota,
                            rutaPagare: data.rutapagare,
                            rutaContrato: data.rutacontrato,
                            idEstadoFinanciamiento: data.idestadofinanciamiento
                        };
                        return tratamiento;
                    });
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: datosTratamiento });
                }
                else {
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
                }
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.crearfinanciamiento = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idclinica = req.body.idclinica;
            let rutPaciente = req.body.rutPaciente;
            let numeroPaciente = req.body.numeroPaciente;
            let nombrePaciente = req.body.nombrePaciente;
            let apellidoPaciente = req.body.apellidoPaciente;
            let emailPaciente = req.body.emailPaciente;
            let rutPagador = req.body.rutPagador;
            let emailPagador = req.body.emailPagador;
            let idProductoGarantia = req.body.idProductoGarantia;
            //let numeroTratamiento: number = req.body.numeroTratamiento;
            let idDoctor = req.body.idDoctor;
            let duracionTratamiento = req.body.duracionTratamiento;
            let montoTratatamiento = req.body.montoTratatamiento;
            let montoPagoInicial = req.body.montoPagoInicial;
            let financiamientoASolicitar = req.body.financiamientoASolicitar;
            let nombreOrtodoncista = req.body.nombreOrtodoncista;
            let telefonoPaciente = req.body.telefonoPaciente;
            try {
                let result = yield axios_1.default.post(urlServicioClinica + String(urlCreaFinanciamiento), {
                    idclinica: idclinica,
                    rutPaciente: rutPaciente,
                    numeroPaciente: numeroPaciente,
                    nombrePaciente: nombrePaciente,
                    apellidoPaciente: apellidoPaciente,
                    emailPaciente: emailPaciente,
                    rutPagador: rutPagador,
                    emailPagador: emailPagador,
                    idProductoGarantia: idProductoGarantia,
                    //numeroTratamiento: numeroTratamiento,
                    idDoctor: idDoctor,
                    duracionTratamiento: duracionTratamiento,
                    montoTratatamiento: montoTratatamiento,
                    montoPagoInicial: montoPagoInicial,
                    financiamientoASolicitar: financiamientoASolicitar,
                    nombreOrtodoncista: nombreOrtodoncista,
                    telefonoPaciente: telefonoPaciente
                });
                if (result.data.status == 200) {
                    let idTratamientoResponse = result.data.data.id_tratamiento;
                    let rutPagadorResponse = result.data.data.rut_pagador;
                    let usuarioToken = {
                        rutpagador: rutPagadorResponse,
                        idtratamiento: idTratamientoResponse
                    };
                    let token = yield (0, token_1.generaToken)(usuarioToken, process.env.JWT_TOKEN_EXPIRES_CREAR_CUENTAS);
                    let urlParamEncrypt = encryption.encrypt(`rutpagador=${rutPagadorResponse}&idtratamiento=${idTratamientoResponse}&token=${token}`);
                    const url = String(urlCreaCuenta) + '?' + urlParamEncrypt;
                    yield this.enviarcorreoregistro(req, url);
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
                }
                else {
                    res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
                }
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.actualizarnotainterna = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idtratamiento = req.body.idtratamiento;
            let textonotainterna = req.body.textonotainterna;
            try {
                let result = yield axios_1.default.put(urlServicioClinica + String(process.env.ACTUALIZARNOTAINTERNA), {
                    idtratamiento: idtratamiento,
                    textonotainterna: textonotainterna
                });
                res.status(result.data.status).json({ status: result.data.status, message: result.data.message, data: result.data.data });
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.obtenerrutaarchivo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let rutpagador = req.body.rutpagador;
            let idfinanciamiento = req.body.idfinanciamiento;
            let tipoarchivo = req.body.tipoarchivo;
            try {
                let result = yield axios_1.default.post(urlServicioClinica + String(process.env.OBTENERRUTAARCHIVO), {
                    rutpagador: rutpagador,
                    idfinanciamiento: idfinanciamiento,
                    tipoarchivo: tipoarchivo
                });
                res.status(result.data.status).json({ data: result.data });
            }
            catch (error) {
                res.status(500).json({ status: 500, message: error });
            }
        });
        this.getUsuarios = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield axios_1.default.get(urlServicioUsuario + String(process.env.LISTARUSUARIOS));
                let usuario = result.data;
                res.status(result.status).json(usuario);
            }
            catch (error) {
                next(error);
            }
        });
        this.validaringresousuario = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let correo = req.body.correo;
            let clave = req.body.clave;
            try {
                let result = yield axios_1.default.post(urlServicioUsuario + String(process.env.VALIDARINGRESOUSUARIO), {
                    correo: correo,
                    clave: clave
                });
                if (result.data.status === 200) {
                    let usuarioToken = {
                        idusuario: result.data.data.idusuario,
                        idperfil: result.data.data.idperfil
                    };
                    let token = yield (0, token_1.generaToken)(usuarioToken);
                    res.setHeader('Authorization', 'Bearer ' + token);
                    res.setHeader('token', token);
                    return res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data, token: token });
                }
                res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
            }
            catch (error) {
                next(error);
            }
        });
        this.obtenerclaveusuario = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let correo = req.body.correo;
            let nombre = req.body.nombre;
            try {
                let result = yield axios_1.default.post(urlServicioUsuario + String(process.env.OBTENERCLAVEUSUARIO), {
                    correo: correo,
                    nombre: nombre
                });
                if (result.data.status == 200) {
                    //let decryptClave = encryption.decrypt(result.data.data.clave);
                    //await this.enviarcorreorecuperarclave(req, decryptClave);
                    yield this.enviarcorreorecuperarclave(req, result.data.data.clave);
                    return res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
                }
                res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
            }
            catch (error) {
                console.log(error);
                next(error);
            }
        });
        this.obtenerarchivo = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let nombrearchivo = req.body.nombrearchivo;
            let rutpagador = req.body.rutpagador;
            let idtratamiento = req.body.idtratamiento;
            let tipoarchivo = req.body.tipoarchivo;
            if (!nombrearchivo)
                return res.status(200).json({ status: 400, message: 'Ingrese nombre archivo' });
            if (!rutpagador)
                return res.status(200).json({ status: 400, message: 'Ingrese rutpagador' });
            if (!idtratamiento)
                return res.status(200).json({ status: 400, message: 'Ingrese id tratamiento' });
            if (!tipoarchivo)
                return res.status(200).json({ status: 400, message: 'Ingrese tipo archivo' });
            try {
                let result = yield axios_1.default.put(urlServicioClinica + String(process.env.ACTUALIZARIMPRESOARCHIVO), {
                    rutpagador: rutpagador,
                    idtratamiento: idtratamiento,
                    tipoarchivo: tipoarchivo
                });
                if (result.data.status == 200) {
                    const lastItem = nombrearchivo.substring(nombrearchivo.lastIndexOf('/') + 1);
                    let archivobase64 = yield axios_1.default.post(urlServicioObtenerArchivo, {
                        fileName: lastItem,
                        carpetaBucket: carpetabucket
                    });
                    return res.status(200).json({ status: 200, message: 'Datos entregados', data: archivobase64.data });
                }
                res.status(200).json({ status: result.data.status, message: result.data.message });
            }
            catch (error) {
                return res.status(200).json({ status: 204, message: 'No existe archivo en gcp', data: null });
            }
        });
        this.enviarcorreoregistro = (req, urlCrear) => __awaiter(this, void 0, void 0, function* () {
            let templateId = req.body.pacientePagador === 1 ? String(pagadorIgualPaciente) : String(pagadorDiferentePaciente);
            let to = req.body.emailPagador;
            let nombre = req.body.nombrePaciente + ' ' + req.body.apellidoPaciente;
            let pagador = req.body.nombrePaciente + ' ' + req.body.apellidoPaciente;
            let paciente = req.body.nombrePaciente === "" ? " " : req.body.nombrePaciente;
            let codigo = '';
            let url = urlCrear;
            let asunto = 'Crear cuenta';
            var axios = require('axios');
            var data = JSON.stringify({
                "templateId": templateId,
                "to": to,
                "nombre": nombre,
                "pagador": pagador,
                "paciente": paciente,
                "codigo": codigo,
                "url": url,
                "asunto": asunto
            });
            var config = {
                method: 'post',
                url: urlServicioCorreo,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                return;
            })
                .catch(function (err) {
                console.log(err);
            });
        });
        this.enviarcorreorecuperarclave = (req, clave) => __awaiter(this, void 0, void 0, function* () {
            let templateId = String(recuperarContrasenaCorreo);
            let to = req.body.correo;
            let nombre = req.body.nombre;
            let codigo = clave;
            let asunto = 'Recuperar contraseña';
            var axios = require('axios');
            var data = JSON.stringify({
                "templateId": templateId,
                "to": to,
                "nombre": nombre,
                "codigo": codigo,
                "asunto": asunto
            });
            var config = {
                method: 'post',
                url: urlServicioCorreo,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };
            axios(config)
                .then(function (response) {
                return;
            })
                .catch(function (err) {
                console.log(err);
            });
        });
        this.generarPagare = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let rutpagador = req.body.rutpagador;
            let idtratamiento = req.body.idtratamiento;
            if (!rutpagador)
                return res.status(200).json({ status: 400, message: 'Ingrese rut pagador' });
            if (!idtratamiento)
                return res.status(200).json({ status: 400, message: 'Ingrese id tratamiento' });
            let resultObtenerArchivo = yield axios_1.default.post(urlServicioClinica + String(process.env.OBTENERRUTAARCHIVO), {
                rutpagador: rutpagador,
                idtratamiento: idtratamiento,
                tipoarchivo: 3
            });
            if (resultObtenerArchivo.data.status == 200) {
                const lastItem = resultObtenerArchivo.data.data.ruta.substring(resultObtenerArchivo.data.data.ruta.lastIndexOf('/') + 1);
                yield axios_1.default.post(urlServicioEliminarArchivo, {
                    fileName: lastItem,
                    carpetaBucket: carpetabucket
                });
            }
            let resultEliminacion = yield axios_1.default.post(urlServicioClinica + String(process.env.ELIMINARARCHIVO), {
                rutpagador: rutpagador,
                idtratamiento: idtratamiento,
                idtipoarchivo: 3
            });
            if (resultEliminacion.data.status == 200) {
                let result = yield axios_1.default.post(urlServicioClinica + String(process.env.OBTENERDATOSCONTRATOPAGARE), {
                    rutpagador: rutpagador,
                    idtratamiento: idtratamiento
                });
                if (result.data.status == 200) {
                    let htmlEntrada;
                    let htmlSalida = '';
                    let fechaActual = new Date().toLocaleString('en-EN', { timeZone: 'Chile/Continental', year: 'numeric', month: '2-digit', day: '2-digit' });
                    if (result.data.data[0].necesitacodeudor == true) {
                        htmlEntrada = fs.readFileSync(path.join(__dirname, '../html/pagare-aval.html'), 'utf8');
                        htmlSalida = htmlEntrada
                            .replaceAll("{{Nombre Comprador}}", result.data.data[0].nombrespagador + ' ' + result.data.data[0].apellidospagador)
                            .replaceAll("{{casado(a) en sociedad conyugal, quien comparece a través de su patrimonio reservado}}", result.data.data[0].estadocivilpagador == 1 ? 'casado(a) en sociedad conyugal, quien comparece a través de su patrimonio reservado,' : '')
                            .replaceAll("{{RUT Comprador}}", rut.format(result.data.data[0].rutpagador))
                            .replaceAll("{{Domicilio Comprador}}", result.data.data[0].direccion + ', ' + (result.data.data[0].adicionaldireccion == null || result.data.data[0].adicionaldireccion == '' ? '' : (result.data.data[0].adicionaldireccion + ', ')) + result.data.data[0].comunapagador)
                            .replaceAll("{{Región}}", result.data.data[0].regionpagador)
                            .replaceAll("{{Monto Pagaré}}", Intl.NumberFormat(_pais).format(result.data.data[0].montopostevaluacion))
                            .replaceAll("{{Monto en Letras}}", result.data.data[0].montopostevaluacion <= 1000000 ? convertir.NumerosALetras(result.data.data[0].montopostevaluacion).split("00/100")[0] : convertir.NumerosALetras(result.data.data[0].montopostevaluacion).split("00/100")[0].replace("de", ""))
                            .replaceAll("{{Nº Cuotas}}", result.data.data[0].numerocuotaspostevaluacion)
                            .replaceAll("{{Valor Cuota}}", Intl.NumberFormat(_pais).format(result.data.data[0].montocuotapostevaluacion))
                            .replaceAll("{{Mes Pago Cuota 1}}", moment(new Date(fechaActual)).format("DD/MM/YYYY"))
                            //AVAL
                            .replaceAll("{{Nombre Aval}}", result.data.data[0].nombrescodeudor + ' ' + result.data.data[0].apellidoscodeudor)
                            .replaceAll("{{casado(a) en sociedad conyugal, quien comparece a través de su patrimonio reservado Aval}}", result.data.data[0].estadocivilcodeudor == 1 ? 'casado(a) en sociedad conyugal, quien comparece a través de su patrimonio reservado,' : '')
                            .replaceAll("{{RUT Aval}}", rut.format(result.data.data[0].rutcodeudor))
                            .replaceAll("{{Domicilio Aval}}", result.data.data[0].direccioncodeudor + ', ' + (result.data.data[0].adicionaldireccioncodeudor == null || result.data.data[0].adicionaldireccioncodeudor == '' ? '' : (result.data.data[0].adicionaldireccioncodeudor + ', ')) + result.data.data[0].comunacodeudor)
                            .replaceAll("{{Región Domicilio Aval}}", result.data.data[0].regioncodeudor)
                            .replaceAll("{{Nombre Comprador 2}}", result.data.data[0].nombrespagador + ' ' + result.data.data[0].apellidospagador)
                            .replaceAll("{{Nombre Comprador 3}}", result.data.data[0].nombrespagador + ' ' + result.data.data[0].apellidospagador)
                            .replaceAll("{{Nombre Aval 2}}", result.data.data[0].nombrescodeudor + ' ' + result.data.data[0].apellidoscodeudor)
                            .replaceAll("{{Nombre Comprador 4}}", result.data.data[0].nombrespagador + ' ' + result.data.data[0].apellidospagador)
                            .replaceAll("{{Nombre Aval 3}}", result.data.data[0].nombrescodeudor + ' ' + result.data.data[0].apellidoscodeudor)
                            .replaceAll("{{Fecha Pagaré}}", moment(new Date(fechaActual)).format("DD/MM/YYYY"))
                            //AVAL
                            .replaceAll("{{RUT Aval}}", rut.format(result.data.data[0].rutcodeudor));
                    }
                    else {
                        htmlEntrada = fs.readFileSync(path.join(__dirname, '../html/pagare.html'), 'utf8');
                        htmlSalida = htmlEntrada
                            .replaceAll("{{Nombre Comprador}}", result.data.data[0].nombrespagador + ' ' + result.data.data[0].apellidospagador)
                            .replaceAll("{{casado(a) en sociedad conyugal, quien comparece a través de su patrimonio reservado}}", result.data.data[0].estadocivilpagador == 1 ? 'casado(a) en sociedad conyugal, quien comparece a través de su patrimonio reservado,' : '')
                            .replaceAll("{{RUT Comprador}}", rut.format(result.data.data[0].rutpagador))
                            .replaceAll("{{Domicilio Comprador}}", result.data.data[0].direccion + ', ' + (result.data.data[0].adicionaldireccion == null || result.data.data[0].adicionaldireccion == '' ? '' : (result.data.data[0].adicionaldireccion + ', ')) + result.data.data[0].comunapagador)
                            .replaceAll("{{Región}}", result.data.data[0].regionpagador)
                            .replaceAll("{{Monto Pagaré}}", Intl.NumberFormat(_pais).format(result.data.data[0].montopostevaluacion))
                            .replaceAll("{{Monto en Letras}}", result.data.data[0].montopostevaluacion <= 1000000 ? convertir.NumerosALetras(result.data.data[0].montopostevaluacion).split("00/100")[0] : convertir.NumerosALetras(result.data.data[0].montopostevaluacion).split("00/100")[0].replace("de", ""))
                            .replaceAll("{{Nº Cuotas}}", result.data.data[0].numerocuotaspostevaluacion)
                            .replaceAll("{{Valor Cuota}}", Intl.NumberFormat(_pais).format(result.data.data[0].montocuotapostevaluacion))
                            .replaceAll("{{Mes Pago Cuota 1}}", moment(new Date(fechaActual)).format("DD/MM/YYYY"))
                            .replaceAll("{{Fecha Pagaré}}", moment(new Date(fechaActual)).format("DD/MM/YYYY"));
                    }
                    let options = {
                        format: 'Letter',
                        landscape: false,
                        displayHeaderFooter: true,
                        footerTemplate: '<style>span{display: block; height: 4mm; text-align: right; font-size:11px; color:#000; font-family: Arial, sans-serif !important; width:98% !important;}</style><span>Página <label class="pageNumber"></label>/<label class="totalPages"></label></span>',
                        margin: {
                            top: "0.5cm",
                            bottom: "1cm",
                            right: "0.5cm",
                            left: "0.5cm",
                        },
                        printBackground: true,
                    };
                    let baseehtml64 = Buffer.from(htmlSalida).toString('base64');
                    let file = { content: htmlSalida };
                    pdf.generatePdf(file, options, function (err, pdfBuffer) {
                        return __awaiter(this, void 0, void 0, function* () {
                            try {
                                if (err) {
                                    return res.json({ err });
                                }
                                else {
                                    let nombreFileName = 'Pagare' + idtratamiento;
                                    if (result.data.data[0].necesitacodeudor == true) {
                                        nombreFileName = 'PagareAval' + idtratamiento;
                                    }
                                    let ruta = yield axios_1.default.post(urlServicioArchivo, {
                                        fileNameIn: nombreFileName,
                                        fileSource: 'data:application/pdf;base64,' + Buffer.from(pdfBuffer).toString('base64')
                                    });
                                    let resultArchivo = yield axios_1.default.post(urlServicioClinica + String(process.env.GUARDARARCHIVO), {
                                        ruta: ruta.data,
                                        idtratamiento: idtratamiento,
                                        rutpagador: rutpagador,
                                        idtipoarchivo: 3
                                    });
                                    return res.status(resultArchivo.data.status).json({ status: resultArchivo.data.status, message: resultArchivo.data.message, data: resultArchivo.data.data, html: baseehtml64 });
                                }
                            }
                            catch (error) {
                                return res.status(500).json({ status: 500, message: error });
                            }
                        });
                    });
                }
                else {
                    return res.status(200).json({ status: result.data.status, message: result.data.message, data: result.data.data });
                }
            }
            else {
                return res.status(200).json({ status: resultEliminacion.data.status, message: resultEliminacion.data.message, data: resultEliminacion.data.data });
            }
        });
    }
}
;
exports.default = new Controller();
