const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/contenido-home`;

export async function getContenidoHome() {
  const response = await fetch(API_URL, { cache: 'no-store' });
  if (!response.ok) throw new Error('Error al obtener el contenido del home');
  return response.json();
}