// services/usuarioService.ts

import Users from "../models/User";
import StorageNavegador from "./StorageNavegador";

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/usuario`;

export async function registerUsuario(userData: any) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token=user?.token;
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error registrando usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getUsuarios() {
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
      throw new Error(error.message || 'Error obteniendo usuarios');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getUsuarioByFirebaseUid(uid_firebase: string) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(`${API_URL}/firebase/${uid_firebase}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error obteniendo usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateUsuario(uid_firebase: string, userData: Partial<Users>) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(`${API_URL}/${uid_firebase}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error actualizando usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function updateUsuarioEstado(uid_firebase: string, estado: string) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(`${API_URL}/${uid_firebase}/estado`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ estado }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error actualizando estado del usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function uploadUsuarioFoto(uid_firebase: string, fotoFile: File) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const formData = new FormData();
    formData.append('foto', fotoFile);
    
    const response = await fetch(`${API_URL}/${uid_firebase}/foto`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error subiendo foto del usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteUsuario(uid_firebase: string) {
  try {
    const user = StorageNavegador.getItemWithExpiry("user") as Users;
    const token = user?.token;
    
    const response = await fetch(`${API_URL}/${uid_firebase}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error eliminando usuario');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}
