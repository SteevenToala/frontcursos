"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SiteLayout } from "../../../../components/site-layout"
import { UserSidebar } from "../../../../components/ui/user-sidebar"
import { DashboardMain } from "../../../../components/dashboard/dashboard-main"
import { EnrolledEvents } from "../../../../components/dashboard/enrolled-events"
import { PersonalInfo } from "../../../../components/dashboard/personal-info"
import { Certificates } from "../../../../components/dashboard/certificates"
import StorageNavegador from "../../../Services/StorageNavegador"
import User from "../../../models/User"
import '../../../globals.css'

export default function DashboardPage() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("dashboard")
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Verificar autenticación del usuario
    // const userData = StorageNavegador.getItemWithExpiry<User>("user")
    // if (!userData) {
      // Para desarrollo, usamos un usuario mock basado en el esquema de la BD
      const mockUser: User = {
        uid_firebase: "firebaseUID123",
        uid: "1", // Mantener compatibilidad
        nombres: "Juan Carlos",
        apellidos: "Pérez García",
        correo: "juan.perez@email.com",
        cedula: "12345678",
        telefono: "+1234567890",
        direccion: "Calle Principal 123, Ciudad",
        rol: "estudiante",
        carrera: "Ingeniería de Sistemas",
        estado: "activo",
        url_foto: "/placeholder-user.jpg",
        // Campos de compatibilidad
        email: "juan.perez@email.com",
        verify: true,
        token: "mock-token-123",
        username: "Juan Carlos Pérez",
        urlUserImg: "/placeholder-user.jpg"
      }
      setUser(mockUser)
      setLoading(false)
      return
    // }
    // setUser(userData)
    // setLoading(false)
  }, [router])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <SiteLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      </SiteLayout>
    )
  }
  // if (loading) {
  //   return (
  //     <SiteLayout>
  //       <div className="flex items-center justify-center min-h-screen">
  //         <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
  //       </div>
  //     </SiteLayout>
  //   )
  // }

  // if (!user) {
  //   return null
  // }
  const renderContent = () => {
    // Verificación de seguridad para TypeScript
    if (!user) return null;
      switch (activeSection) {
      case "dashboard":
        return <DashboardMain user={user} />
      case "events":
        return <EnrolledEvents user={user} />
      case "personal":
        return <PersonalInfo user={user} />
      case "certificates":
        return <Certificates user={user} />
      default:
        return <DashboardMain user={user} />
    }
  }

  // Verificación de seguridad para TypeScript
  if (!user) {
    return (
      <SiteLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p>Cargando usuario...</p>
          </div>
        </div>
      </SiteLayout>
    )
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
