'use client';
import '@/app/globals.css';
import { useEffect, useState } from "react";
import Sidebar from '@/components/ui/Sidebar';
import StorageNavegador from '@/app/Services/StorageNavegador';
import { useRouter } from "next/navigation"
import Inicio from '../sections/Inicio';
import MisionVision from '../sections/MisionVision';
import Autoridade from '../sections/Autoridades';
import Solicitudes from '../sections/Solicitudes';
import Eventos from '../sections/Eventos';
import Reportes from '../sections/Reportes';
import Calificacion from '../sections/Calificacion';
import Inscripciones from '../sections/Inscripciones';
import GestionCambio from '../sections/GestionCambio';

const sectionComponents: { [key: string]: React.ReactNode } = {
  dashboard: <Inicio />,
  mision_vision: <MisionVision />,
  autoridades: <Autoridade />,
  solicitudes: <Solicitudes />,
  eventos: <Eventos />,
  reportes: <Reportes />,
  calificaciones: <Calificacion />,
  inscripciones: <Inscripciones />,
  gestion_cambio: <GestionCambio />
};

export default function SidebarLayout() {
  const router = useRouter()

  useEffect(() => {
    const user = StorageNavegador.getItemWithExpiry("user");
    if (!user || user && typeof user === "object" && "rol" in user && (user as any).rol !== "admin") {
      router.push("/")
    }
  }, [router])
  const [activeSection, setActiveSection] = useState("dashboard");

  return (

    <div className="flex h-screen bg-[#f8f4ee]">
      <Sidebar active={activeSection} onSelect={setActiveSection} />
      <main className="flex-1 p-8 overflow-y-auto">
        {sectionComponents[activeSection] ?? <p>Sección no encontrada</p>}
      </main>
    </div>
  );
}
