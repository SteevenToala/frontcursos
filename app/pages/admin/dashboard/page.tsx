"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setUser(parsed.data ? parsed.data : parsed); // Soporta ambos formatos
        } catch {
          setUser(null);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/pages/login";
  };

  return (
    <div>
      <div>Dashboard Page ADMIN</div>
      {user ? (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="font-bold mb-2">Datos del usuario logueado:</h2>
          <pre className="text-sm bg-white p-2 rounded border overflow-x-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="mt-4 text-gray-500">No hay usuario logueado.</div>
      )}
    </div>
  );
}