export interface Evento {
    nombre: string;
    tipoEvento: string;
    fechaInicio: string;
    fechaFin: string;
    modalidad: string;
    costo: number;
    categoria: string;
    numeroHoras: string;
    notaAprovacion: number;
    requiereAsistencia: boolean;
    urlFoto: string;
    visible: boolean;
    descripcion: string;
    idOrganizador: number;
    facultades: number[] | null;
    requisitos: number[] | null
    idSeccion: number;
}

export const eventoInicial: Evento = {
    nombre: "",
    tipoEvento: "Pagado",
    fechaInicio: "",
    fechaFin: "",
    modalidad: "presencial",
    costo: 0,
    categoria: "software",
    numeroHoras: "",
    notaAprovacion: 0,
    requiereAsistencia: true,
    urlFoto: "",
    visible: true,
    descripcion: "",
    idOrganizador: 1,
    facultades: null,
    requisitos: null,
    idSeccion: 2,

};