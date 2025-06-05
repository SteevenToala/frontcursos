interface Event {
  id_evento: number;
  nombre: string;
  tipo_evento: string;
  fecha_inicio: Date | string;
  fecha_fin: Date | string;
  modalidad: string;
  costo: number;
  categoria: string;
  numero_horas: number;
  nota_aprovacion: number;
  requiere_asistencia: boolean;
  url_foto: string;
  visible: boolean;
  descripcion: string;
  id_organizador: number;
  fecha_eliminacion?: Date | string | null;
  id_seccion: number;
}

export default Event;
