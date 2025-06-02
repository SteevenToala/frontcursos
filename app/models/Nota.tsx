
export interface Nota {
    id_nota: number; // PK
    id_inscripcion: number; // FK → Inscripcion.id_inscripcion
    nota_final: number;
}

export default Nota;
