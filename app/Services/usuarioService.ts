// services/usuarioService.ts

const API_URL = 'http://localhost:3001/usuario';

export async function registerUsuario(userData: any) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
