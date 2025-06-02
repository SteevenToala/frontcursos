
export interface Inscripcion {
    id_inscripcion: number; // PK
    id_usuario: string; // FK → Usuario.uid_firebase
    id_evento: number; // FK → Evento.id_evento
    fecha_inscripcion: Date;
    estado_pago: string;
    forma_pago: string;
    comprobante_pago: string;
    estado_inscripcion: string;
}

export default Inscripcion;
