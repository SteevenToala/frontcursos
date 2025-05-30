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
  Award,
  Download,
  Share2,
  Search,
  Filter,
  Calendar,
  GraduationCap,
  CheckCircle,
  ExternalLink,
  Star,
  Trophy
} from "lucide-react"

interface CertificatesProps {
  user: User
}

export function Certificates({ user }: CertificatesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")

  // Datos mock de certificados
  const certificates = [
    {
      id: 1,
      courseName: "Desarrollo Web con React",
      instructor: "Ana García",
      completionDate: "2024-01-20",
      certificateNumber: "CERT-2024-001-WR",
      grade: "A+",
      rating: 4.8,
      hours: 40,
      skills: ["React", "JavaScript", "HTML", "CSS", "Node.js"],
      verified: true,
      category: "Desarrollo",
      downloadUrl: "/certificates/react-course.pdf",
      shareUrl: "https://eduevents.com/certificates/verify/CERT-2024-001-WR"
    },
    {
      id: 2,
      courseName: "Python para Data Science",
      instructor: "Dr. Roberto Silva",
      completionDate: "2024-01-15",
      certificateNumber: "CERT-2024-002-PDS",
      grade: "A",
      rating: 4.7,
      hours: 35,
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
      verified: true,
      category: "Data Science",
      downloadUrl: "/certificates/python-datascience.pdf",
      shareUrl: "https://eduevents.com/certificates/verify/CERT-2024-002-PDS"
    },
    {
      id: 3,
      courseName: "Diseño UX/UI con Figma",
      instructor: "María Rodríguez",
      completionDate: "2023-12-10",
      certificateNumber: "CERT-2023-015-UXF",
      grade: "A+",
      rating: 4.9,
      hours: 30,
      skills: ["Figma", "Design Thinking", "Prototyping", "User Research", "UI Design"],
      verified: true,
      category: "Diseño",
      downloadUrl: "/certificates/ux-ui-figma.pdf",
      shareUrl: "https://eduevents.com/certificates/verify/CERT-2023-015-UXF"
    }
  ]

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesFilter = filterBy === "all" || cert.category.toLowerCase() === filterBy.toLowerCase()
    
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalCertificates: certificates.length,
    totalHours: certificates.reduce((sum, cert) => sum + cert.hours, 0),
    avgRating: (certificates.reduce((sum, cert) => sum + cert.rating, 0) / certificates.length).toFixed(1),
    skillsEarned: [...new Set(certificates.flatMap(cert => cert.skills))].length
  }

  const handleDownload = (certificate: any) => {
    console.log(`Descargando certificado: ${certificate.certificateNumber}`)
    // Aquí iría la lógica para descargar el certificado
  }

  const handleShare = (certificate: any) => {
    navigator.clipboard.writeText(certificate.shareUrl)
    console.log(`URL copiada: ${certificate.shareUrl}`)
    // Mostrar notificación de éxito
  }

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A+":
        return "text-green-600 bg-green-100"
      case "A":
        return "text-blue-600 bg-blue-100"
      case "B+":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header con estadísticas */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mis Certificados</h1>
        <p className="text-muted-foreground mb-6">
          Visualiza y gestiona todos tus certificados obtenidos
        </p>
        
        {/* Estadísticas rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Certificados</p>
                  <p className="text-2xl font-bold text-primary">{stats.totalCertificates}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horas totales</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalHours}h</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Calificación promedio</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.avgRating}/5</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Habilidades</p>
                  <p className="text-2xl font-bold text-green-600">{stats.skillsEarned}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar certificados, instructores o habilidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="desarrollo">Desarrollo</SelectItem>
                  <SelectItem value="diseño">Diseño</SelectItem>
                  <SelectItem value="data science">Data Science</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de certificados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header del certificado */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <span className="text-sm font-medium text-primary">{certificate.category}</span>
                      {certificate.verified && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <h3 className="font-bold text-lg text-foreground leading-tight">
                      {certificate.courseName}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Instructor: {certificate.instructor}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${getGradeColor(certificate.grade)}`}>
                    {certificate.grade}
                  </div>
                </div>

                {/* Información del certificado */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Número de certificado:</span>
                    <span className="font-mono text-xs">{certificate.certificateNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fecha de finalización:</span>
                    <span>{new Date(certificate.completionDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duración:</span>
                    <span>{certificate.hours} horas</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Calificación del curso:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{certificate.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Habilidades obtenidas */}
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">Habilidades obtenidas:</p>
                  <div className="flex flex-wrap gap-1">
                    {certificate.skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-accent text-accent-foreground rounded-md text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={() => handleDownload(certificate)}
                    className="flex-1 auth-button"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Descargar
                  </Button>
                  <Button 
                    onClick={() => handleShare(certificate)}
                    variant="outline"
                    size="sm"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(certificate.shareUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Estado vacío */}
      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron certificados
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm || filterBy !== "all" 
                ? "Intenta ajustar tus filtros de búsqueda"
                : "Aún no tienes certificados. ¡Completa un curso para obtener tu primer certificado!"}
            </p>
            <Button className="auth-button">
              Explorar cursos disponibles
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Información adicional */}
      <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Verificación de Certificados</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Todos nuestros certificados son verificables digitalmente. Puedes compartir el enlace de verificación 
                con empleadores o agregar el certificado a tu perfil de LinkedIn.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Agregar a LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir perfil
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
