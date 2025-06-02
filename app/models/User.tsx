
// Interface based on the database schema
interface User {
    uid_firebase: string; // PK
    nombres: string;
    apellidos: string;
    correo: string;
    cedula: string;
    telefono: string;
    direccion: string;
    rol: string;
    carrera: string;
    estado: string;
    url_foto: string;
    
    // Firebase auth fields (for compatibility)
    uid?: string;
    email?: string;
    verify?: boolean;
    token: string;
    username?: string;
    urlUserImg?: string;
}

export default User;