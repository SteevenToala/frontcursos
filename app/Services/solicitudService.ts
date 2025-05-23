import CreateDetalleError from "../models/DetalleError";
import CreateSolicitude from "../models/Solicitud";

class Solicitud {
    static async crearSolicitud(formData: CreateSolicitude) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/solicitudes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error(`Error al crear el usuario: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }

    static async crearDetalleError(formData: CreateDetalleError) {
        const response = await fetch('http://localhost:3001/detalle-error', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        if (!response.ok) {
            throw new Error(`Error al crear el usuario: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    }
}
export default Solicitud;