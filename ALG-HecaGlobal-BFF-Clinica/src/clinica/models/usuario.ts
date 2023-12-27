export interface usuario {
    idusuario: string,
    idperfil: number,
    idclinica: number,
    nombres: string,
    apellidos: string,
    idestado: string,
    correo: string
    //clave: string
}

export interface usuarioToken {
    idusuario?: string,
    idperfil?: number,
    token?: string,
    rutpagador?: string,
    idtratamiento?: string
}