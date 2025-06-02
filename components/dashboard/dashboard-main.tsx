import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import User from "../../app/models/User"
import { formatDate } from "../../lib/date-utils"
import { 
  BookOpen, 
  Calendar, 
  Award, 
  TrendingUp,
  Clock,
  Users,
  GraduationCap,
  ArrowRight,
  UserCheck,
  CreditCard,
  FileText
} from "lucide-react"

interface DashboardMainProps {
  user: User
}

export function DashboardMain({ user }: DashboardMainProps) {
  // Datos del dashboard basados en el esquema de la BD
  const dashboardStats = {
    eventosInscritos: 5,
    eventosCompletados: 3,
    certificadosObtenidos: 2,
    horasTotales: 24,
    asistenciasRegistradas: 15,
    notasAprobatorias: 3
  }
  const eventosRecientes = [
    {
      id_evento: 1,
      nombre: "Desarrollo Web con React",
      tipo_evento: "Curso",
      fecha_inicio: new Date("2024-01-15"),
      fecha_fin: new Date("2024-02-15"),
      modalidad: "Virtual",
      num_horas: 40,
      estado_inscripcion: "activo",
      progreso: 75,
      url_foto: "/placeholder.svg",
      organizador: "Ana García"
    },
    {
      id_evento: 2,
      nombre: "JavaScript Moderno ES6+",
      tipo_evento: "Taller",
      fecha_inicio: new Date("2024-02-01"),
      fecha_fin: new Date("2024-02-28"),
      modalidad: "Presencial",
      num_horas: 20,
      estado_inscripcion: "completado",
      progreso: 100,
      url_foto: "/placeholder.svg",
      organizador: "Carlos López"
    },
    {
      id_evento: 3,
      nombre: "Diseño UX/UI Avanzado",
      tipo_evento: "Diplomado",
      fecha_inicio: new Date("2024-03-01"),
      fecha_fin: new Date("2024-04-30"),
      modalidad: "Híbrido",
      num_horas: 60,
      estado_inscripcion: "pendiente_pago",
      progreso: 0,
      url_foto: "/placeholder.svg",
      organizador: "María Rodríguez"
    }
  ]

  const proximosEventos = [
    {
      id_evento: 4,
      nombre: "Webinar: Tendencias en Desarrollo 2024",
      fecha_inicio: new Date("2024-02-15"),
      hora: "15:00",
      tipo_evento: "Webinar"
    },
    {
      id_evento: 5,
      nombre: "Workshop: Figma Avanzado",
      fecha_inicio: new Date("2024-02-18"),
      hora: "10:00",
      tipo_evento: "Workshop"
    }
  ]

  return (
    <div className="space-y-8">      {/* Header de bienvenida */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          ¡Bienvenido de vuelta, {user.nombres || user.username || "Usuario"}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Continúa tu aprendizaje donde lo dejaste y descubre nuevos eventos
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Eventos Inscritos</p>
                <p className="text-3xl font-bold text-primary">{dashboardStats.eventosInscritos}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completados</p>
                <p className="text-3xl font-bold text-green-600">{dashboardStats.eventosCompletados}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificados</p>
                <p className="text-3xl font-bold text-yellow-600">{dashboardStats.certificadosObtenidos}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Horas de Estudio</p>
                <p className="text-3xl font-bold text-blue-600">{dashboardStats.horasTotales}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Eventos recientes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Continuar con tus Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {eventosRecientes.map((evento) => (
                <div key={evento.id_evento} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{evento.nombre}</h4>
                    <p className="text-sm text-muted-foreground">Organizador: {evento.organizador}</p>
                    <p className="text-sm text-primary font-medium">Modalidad: {evento.modalidad}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${evento.progreso}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{evento.progreso}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        evento.estado_inscripcion === 'activo' ? 'bg-green-100 text-green-700' :
                        evento.estado_inscripcion === 'completado' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {evento.estado_inscripcion.toUpperCase()}
                      </span>
                      <span>{evento.num_horas} horas</span>
                    </div>
                  </div>
                  <Button size="sm" className="auth-button" disabled={evento.estado_inscripcion === 'pendiente_pago'}>
                    {evento.estado_inscripcion === 'pendiente_pago' ? 'Pagar' : 'Continuar'}
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>        {/* Eventos próximos */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {proximosEventos.map((evento) => (
                <div key={evento.id_evento} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {evento.tipo_evento}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">{evento.nombre}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(evento.fecha_inicio)}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{evento.hora}</span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full" size="sm">
                Ver todos los eventos
              </Button>
            </CardContent>
          </Card>

          {/* Progreso semanal */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Tu Progreso
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Meta semanal</span>
                    <span className="font-medium">6/10 horas</span>
                  </div>
                  <div className="bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full w-3/5 transition-all duration-300" />
                  </div>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    ¡Excelente progreso! Estás a solo 4 horas de alcanzar tu meta semanal.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
