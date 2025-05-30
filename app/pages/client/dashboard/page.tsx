"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteLayout } from "../../../../components/site-layout"
import { UserSidebar } from "../../../../components/ui/user-sidebar"
import { DashboardMain } from "../../../../components/dashboard/dashboard-main"
import { EnrolledCourses } from "../../../../components/dashboard/enrolled-courses"
import { PersonalInfo } from "../../../../components/dashboard/personal-info"
import { Certificates } from "../../../../components/dashboard/certificates"
import StorageNavegador from "../../../Services/StorageNavegador"
import User from "../../../models/User"
import '../../globals.css'

export default function DashboardPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    // Verificar autenticación del usuario
    const userData = StorageNavegador.getItemWithExpiry<User>("user")
    if (!userData) {
      // Para desarrollo, usamos un usuario mock
      const mockUser: User = {
        id: "1",
        nombres: "Juan Carlos",
        apellidos: "Pérez García",
        correo: "juan.perez@email.com",
        telefono: "0987654321",
        direccion: "Av. Principal 123, Quito",
        carrera: "Ingeniería en Sistemas",
        url_foto: "/placeholder-user.jpg",
        estadisticas: {
          cursosInscritos: 5,
          cursosCompletados: 3,
          certificadosObtenidos: 2,
          horasEstudio: 24,
          puntajePromedio: 4.5
        },
        configuracion: {
          notificaciones: true,
          idioma: "es",
          tema: "light",
          privacidad: "publico"
        }
      }
      setUser(mockUser)
      setLoading(false)
      return
    }
    setUser(userData)
    setLoading(false)
  }, [router])

  if (loading) {
    return (
      <SiteLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </SiteLayout>
    )
  }

  if (!user) {
    return null
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardMain user={user} />
      case "courses":
        return <EnrolledCourses user={user} />
      case "personal":
        return <PersonalInfo user={user} />
      case "certificates":
        return <Certificates user={user} />
      default:
        return <DashboardMain user={user} />
    }
  }

  return (
    <SiteLayout>
      <div className="flex min-h-[calc(100vh-4rem)] bg-gray-50">
        <UserSidebar 
          active={activeSection} 
          onSelect={setActiveSection}
          user={user}
        />
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </SiteLayout>
  )
}
