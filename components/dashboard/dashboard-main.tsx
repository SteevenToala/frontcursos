import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import User from "../../app/models/User"
import { 
  BookOpen, 
  Calendar, 
  Award, 
  TrendingUp,
  Clock,
  Users,
  GraduationCap,
  ArrowRight
} from "lucide-react"

interface DashboardMainProps {
  user: User
}

export function DashboardMain({ user }: DashboardMainProps) {
  // Datos mock para el dashboard
  const dashboardStats = {
    enrolledCourses: 5,
    completedCourses: 3,
    certificates: 2,
    totalHours: 24
  }

  const recentCourses = [
    {
      id: 1,
      title: "Desarrollo Web con React",
      progress: 75,
      nextLesson: "Hooks Avanzados",
      instructor: "Ana García",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "JavaScript Moderno",
      progress: 45,
      nextLesson: "Async/Await",
      instructor: "Carlos López",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Diseño UX/UI",
      progress: 90,
      nextLesson: "Proyecto Final",
      instructor: "María Rodríguez",
      image: "/placeholder.svg"
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Webinar: Tendencias en Desarrollo 2024",
      date: "2024-02-15",
      time: "15:00",
      type: "Webinar"
    },
    {
      id: 2,
      title: "Workshop: Figma Avanzado",
      date: "2024-02-18",
      time: "10:00",
      type: "Workshop"
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header de bienvenida */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 border border-primary/20">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          ¡Bienvenido de vuelta, {user.username || "Usuario"}! 👋
        </h1>
        <p className="text-muted-foreground text-lg">
          Continúa tu aprendizaje donde lo dejaste y descubre nuevos cursos
        </p>
      </div>

      {/* Estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Cursos Inscritos</p>
                <p className="text-3xl font-bold text-primary">{dashboardStats.enrolledCourses}</p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completados</p>
                <p className="text-3xl font-bold text-green-600">{dashboardStats.completedCourses}</p>
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
                <p className="text-3xl font-bold text-yellow-600">{dashboardStats.certificates}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Horas de Estudio</p>
                <p className="text-3xl font-bold text-blue-600">{dashboardStats.totalHours}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cursos recientes */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Continuar Aprendiendo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentCourses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
                    <p className="text-sm text-primary font-medium">Siguiente: {course.nextLesson}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{course.progress}%</span>
                    </div>
                  </div>
                  <Button size="sm" className="auth-button">
                    Continuar
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Eventos próximos */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Próximos Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                      {event.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground text-sm mb-2">{event.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(event.date).toLocaleDateString('es-ES')}</span>
                    <Clock className="h-3 w-3 ml-2" />
                    <span>{event.time}</span>
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
                <Users className="h-5 w-5" />
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
