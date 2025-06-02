
export interface Certificado {
    id_certificado: number; // PK
    id_inscripcion: number; // FK → Inscripcion.id_inscripcion
    tipo_certificado: string;
    fecha_emision: Date;
    url_certificado: string;
}

export default Certificado;
