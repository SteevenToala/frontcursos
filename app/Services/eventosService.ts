const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/Eventos`;

export async function  getEventos() {
    const res = await fetch(API_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error('Error al obtener los eventos');
    return res.json();
}

