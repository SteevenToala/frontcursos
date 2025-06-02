
export interface Evento {
    id_evento: number; // PK
    nombre: string;
    tipo_evento: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    modalidad: string;
    costo: number;
    organizador: number; // FK → Organizador.id_organizador
    carrera_dirigida: string;
    categoria_area: string;
    num_horas: number;
    nota_aprobacion: number;
    requiere_asistencia: boolean;
    requiere_nota: boolean;
    url_foto: string;
    id_seccion: number; // FK → Secciones.id_seccion
    visible: boolean;
    descripcion: string;
}

export default Evento;
