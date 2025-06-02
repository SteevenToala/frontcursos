// services/eventoService.ts

import Evento from "../models/Evento";
import Inscripcion from "../models/Inscripcion";
import Users from "../models/User";
import StorageNavegador from "./StorageNavegador";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/evento`;

export async function getEventos() {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo eventos');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getEventoById(id: number) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo evento');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getEventosUsuario(uid_firebase: string) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(`${API_URL}/usuario/${uid_firebase}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo eventos del usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function createEvento(eventoData: Partial<Evento>) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(eventoData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error creando evento');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateEvento(id: number, eventoData: Partial<Evento>) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(eventoData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error actualizando evento');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteEvento(id: number) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error eliminando evento');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
