export interface SendgridConfigSecret {
    Sendgrid_API_Key: string;
    Sendgrid_TmpId_CreacionCuenta1: string;
    Sendgrid_TmpId_CreacionCuenta2: string;
    Sendgrid_TmpId_RecuperarClave: string;
    Sendgrid_TmpId_RegistroCodeudor: string;
    Sendgrid_TmpId_SolicitudBoleta: string;
    Sendgrid_from: string;
    EmailCopia: string;
}

export interface BffClinicaRoutesSecret {
    HOST: string;
    URL_BASE_CREAR_CUENTA: string;
    URL_BASE_SERVICIO_USUARIO: string;
    URL_BASE_SERVICIO_CLINICA: string;
    URL_BASE_SERVICIO_CORREO: string;
    URL_BASE_SERVICIO_OBTENER_ARCHIVO: string;
    VALIDARINGRESOUSUARIO: string;
    LISTARUSUARIOS: string;
    OBTENERCLAVEUSUARIO: string;
    ESTADOSCUOTAS: string;
    LISTAFINANCIAMIENTOS: string;
    LISTARESTADOSFINANCIAMIENTOSUPERIOR: string;
    ACTUALIZARIMPRESOARCHIVO: string;
    OBTENERDATOSTRATAMIENTO: string;
    CREARFINANCIAMIENTO: string;
    ESTADOSFINANCIAMIENTOS: string;
    ACTUALIZARNOTAINTERNA: string;
    PRODUCTOGARANTIA: string;
    OBTENERRUTAARCHIVO: string;
    CARPETABUCKET: string;
    URL_BASE_SERVICIO_ARCHIVO: string;
    OBTENERDATOSCONTRATOPAGARE: string;
    GUARDARARCHIVO: string;
    ELIMINARARCHIVO: string;
    ELIMINARARCHIVOSSTORAGE: string;
}

export interface CryptoConfigSecret {
    ENCRYPTION_KEY: string;
    ALGORITHM: string;
    SALT: string;
}

export interface JwtConfigSecret {
    JWT_SECRETKEY: string;
    JWT_TOKEN_EXPIRES: string;
    JWT_TOKEN_EXPIRES_CREAR_CUENTAS: string;
}

export interface RegionalConfigSecret {
    CURRENCY_ID: string;
    PAIS: string;
    PAIS_CODE: string;
    ZONA_HORARIA: string;
}

export interface AllSecrets extends SendgridConfigSecret, BffClinicaRoutesSecret, CryptoConfigSecret, JwtConfigSecret, RegionalConfigSecret {}
