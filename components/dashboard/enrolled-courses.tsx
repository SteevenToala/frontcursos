import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select"
import User from "../../app/models/User"
import { 
  BookOpen, 
  Filter, 
  Search,
  Clock,
  Star,
  Users,
  Play,
  Calendar,
  CheckCircle,
  MoreVertical
} from "lucide-react"

interface EnrolledCoursesProps {
  user: User
}

export function EnrolledCourses({ user }: EnrolledCoursesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Datos mock de cursos inscritos
  const enrolledCourses = [
    {
      id: 1,
      title: "Desarrollo Web con React",
      instructor: "Ana García",
      category: "Desarrollo",
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      duration: "40 horas",
      rating: 4.8,
      students: 1250,
      thumbnail: "/placeholder.svg",
      status: "active",
      enrolledDate: "2024-01-15",
      lastAccessed: "2024-02-10",
      nextLesson: "Hooks Avanzados en React",
      estimatedCompletion: "1 semana"
    },
    {
      id: 2,
      title: "JavaScript Moderno ES6+",
      instructor: "Carlos López",
      category: "Programación",
      progress: 45,
      totalLessons: 16,
      completedLessons: 7,
      duration: "25 horas",
      rating: 4.6,
      students: 890,
      thumbnail: "/placeholder.svg",
      status: "active",
      enrolledDate: "2024-01-20",
      lastAccessed: "2024-02-08",
      nextLesson: "Async/Await y Promesas",
      estimatedCompletion: "2 semanas"
    },
    {
      id: 3,
      title: "Diseño UX/UI con Figma",
      instructor: "María Rodríguez",
      category: "Diseño",
      progress: 90,
      totalLessons: 12,
      completedLessons: 11,
      duration: "30 horas",
      rating: 4.9,
      students: 654,
      thumbnail: "/placeholder.svg",
      status: "active",
      enrolledDate: "2023-12-01",
      lastAccessed: "2024-02-09",
      nextLesson: "Proyecto Final",
      estimatedCompletion: "3 días"
    },
    {
      id: 4,
      title: "Python para Data Science",
      instructor: "Dr. Roberto Silva",
      category: "Data Science",
      progress: 100,
      totalLessons: 18,
      completedLessons: 18,
      duration: "35 horas",
      rating: 4.7,
      students: 987,
      thumbnail: "/placeholder.svg",
      status: "completed",
      enrolledDate: "2023-11-10",
      lastAccessed: "2024-01-20",
      nextLesson: null,
      estimatedCompletion: "Completado"
    },
    {
      id: 5,
      title: "Marketing Digital Estratégico",
      instructor: "Laura Fernández",
      category: "Marketing",
      progress: 20,
      totalLessons: 14,
      completedLessons: 3,
      duration: "28 horas",
      rating: 4.5,
      students: 756,
      thumbnail: "/placeholder.svg",
      status: "active",
      enrolledDate: "2024-02-01",
      lastAccessed: "2024-02-05",
      nextLesson: "Fundamentos de SEO",
      estimatedCompletion: "4 semanas"
    }
  ]

  const filteredCourses = enrolledCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterStatus === "all" || course.status === filterStatus
    
    return matchesSearch && matchesFilter
  })

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "progress":
        return b.progress - a.progress
      case "title":
        return a.title.localeCompare(b.title)
      case "recent":
      default:
        return new Date(b.lastAccessed).getTime() - new Date(a.lastAccessed).getTime()
    }
  })

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500"
    if (progress >= 75) return "bg-blue-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-gray-400"
  }

  const getStatusBadge = (status: string, progress: number) => {
    if (status === "completed" || progress === 100) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
          <CheckCircle className="h-3 w-3" />
          Completado
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
        <Play className="h-3 w-3" />
        En Progreso
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mis Cursos</h1>
        <p className="text-muted-foreground">
          Gestiona y continúa tus cursos inscritos
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar cursos, instructores o categorías..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">En Progreso</SelectItem>
                  <SelectItem value="completed">Completados</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recientes</SelectItem>
                  <SelectItem value="progress">Progreso</SelectItem>
                  <SelectItem value="title">Título</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de cursos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sortedCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-foreground text-lg leading-tight">
                      {course.title}
                    </h3>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-xs text-muted-foreground mb-3">
                    {course.category} • {course.duration}
                  </p>
                  
                  {/* Progreso */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Progreso</span>
                      <span className="text-sm text-muted-foreground">
                        {course.completedLessons}/{course.totalLessons} lecciones
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-muted-foreground">
                        {course.progress}% completado
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {course.estimatedCompletion}
                      </span>
                    </div>
                  </div>

                  {/* Información adicional */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Último acceso: {new Date(course.lastAccessed).toLocaleDateString('es-ES')}</span>
                    </div>
                  </div>

                  {/* Estado y siguiente lección */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusBadge(course.status, course.progress)}
                    </div>
                    {course.nextLesson && (
                      <Button size="sm" className="auth-button">
                        Continuar
                      </Button>
                    )}
                  </div>

                  {course.nextLesson && (
                    <div className="mt-3 p-3 bg-accent/50 rounded-lg">
                      <p className="text-sm font-medium text-foreground">
                        Siguiente: {course.nextLesson}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedCourses.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron cursos
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterStatus !== "all" 
                ? "Intenta ajustar tus filtros de búsqueda"
                : "Aún no tienes cursos inscritos"}
            </p>
            <Button className="auth-button">
              Explorar cursos disponibles
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
