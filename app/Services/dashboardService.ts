import StorageNavegador from "./StorageNavegador";
import Users from "../models/User";

// Helper to get env variable safely (client-side only)
function getBackendUrl() {
  if (typeof window !== 'undefined' && (window as any).NEXT_PUBLIC_BACKEND_URL) {
    return (window as any).NEXT_PUBLIC_BACKEND_URL;
  }
  // fallback: try from globalThis
  if (typeof globalThis !== 'undefined' && (globalThis as any).NEXT_PUBLIC_BACKEND_URL) {
    return (globalThis as any).NEXT_PUBLIC_BACKEND_URL;
  }
  return '';
}

const API_URL = `${getBackendUrl()}/dashboard`;


export async function getDataDashboard(token: string) {
  const res = await fetch(`${API_URL}/datos`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al obtener datos dashboard');
  return res.json();
}

export async function getSolicitudesGenerales(token: string) {

  const res = await fetch(`${getBackendUrl()}/solicitud/solicitudesGenerales`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al obtener datos dashboard');
  return res.json();
}

export async function getSolicitudesError(token: string) {
  const res = await fetch(`${getBackendUrl()}/detalle-error`, {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error al obtener datos dashboard');
  return res.json();
}
