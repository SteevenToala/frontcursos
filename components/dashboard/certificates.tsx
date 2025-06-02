import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select"
import User from "../../app/models/User"
import Certificado from "../../app/models/Certificado"
import Inscripcion from "../../app/models/Inscripcion"
import Evento from "../../app/models/Evento"
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
  Trophy,
  FileText,
  Clock,
  MapPin
} from "lucide-react"

// Interface for certificate data with related event and inscription info
interface CertificateWithDetails extends Certificado {
  inscripcion: Inscripcion;
  evento: Evento;
  calificacion?: number;
  asistencia_porcentaje?: number;
}

interface CertificatesProps {
  user: User
}

export function Certificates({ user }: CertificatesProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBy, setFilterBy] = useState("all")

  // Mock data based on database schema - eventos con certificados
  const certificatesWithDetails: CertificateWithDetails[] = [
    {
      id_certificado: 1,
      id_inscripcion: 1,
      tipo_certificado: "Participación",
      fecha_emision: new Date("2024-01-20"),
      url_certificado: "/certificates/react-development.pdf",
      calificacion: 95,
      asistencia_porcentaje: 100,
      inscripcion: {
        id_inscripcion: 1,
        id_usuario: user.uid_firebase,
        id_evento: 1,
        fecha_inscripcion: new Date("2023-12-01"),
        estado_pago: "Pagado",
        forma_pago: "Tarjeta",
        comprobante_pago: "PAY-001",
        estado_inscripcion: "Completado"
      },
      evento: {
        id_evento: 1,
        nombre: "Desarrollo Web con React y Next.js",
        tipo_evento: "Curso",
        fecha_inicio: new Date("2023-12-15"),
        fecha_fin: new Date("2024-01-15"),
        modalidad: "Virtual",
        costo: 150,
        organizador: 1,
        carrera_dirigida: "Ingeniería de Sistemas",
        categoria_area: "Desarrollo Web",
        num_horas: 40,
        nota_aprobacion: 70,
        requiere_asistencia: true,
        requiere_nota: true,
        url_foto: "/images/react-course.jpg",
        id_seccion: 1,
        visible: true,
        descripcion: "Curso completo de desarrollo web moderno con React y Next.js"
      }
    },
    {
      id_certificado: 2,
      id_inscripcion: 2,
      tipo_certificado: "Aprobación",
      fecha_emision: new Date("2024-01-10"),
      url_certificado: "/certificates/python-datascience.pdf",
      calificacion: 88,
      asistencia_porcentaje: 95,
      inscripcion: {
        id_inscripcion: 2,
        id_usuario: user.uid_firebase,
        id_evento: 2,
        fecha_inscripcion: new Date("2023-11-20"),
        estado_pago: "Pagado",
        forma_pago: "Transferencia",
        comprobante_pago: "PAY-002",
        estado_inscripcion: "Completado"
      },
      evento: {
        id_evento: 2,
        nombre: "Python para Data Science",
        tipo_evento: "Taller",
        fecha_inicio: new Date("2023-12-01"),
        fecha_fin: new Date("2024-01-05"),
        modalidad: "Presencial",
        costo: 200,
        organizador: 2,
        carrera_dirigida: "Ingeniería de Sistemas",
        categoria_area: "Data Science",
        num_horas: 35,
        nota_aprobacion: 75,
        requiere_asistencia: true,
        requiere_nota: true,
        url_foto: "/images/python-course.jpg",
        id_seccion: 2,
        visible: true,
        descripcion: "Taller intensivo de análisis de datos con Python"
      }
    },
    {
      id_certificado: 3,
      id_inscripcion: 3,
      tipo_certificado: "Participación",
      fecha_emision: new Date("2023-12-15"),
      url_certificado: "/certificates/ux-ui-design.pdf",
      calificacion: 92,
      asistencia_porcentaje: 90,
      inscripcion: {
        id_inscripcion: 3,
        id_usuario: user.uid_firebase,
        id_evento: 3,
        fecha_inscripcion: new Date("2023-10-15"),
        estado_pago: "Pagado",
        forma_pago: "Efectivo",
        comprobante_pago: "PAY-003",
        estado_inscripcion: "Completado"
      },
      evento: {
        id_evento: 3,
        nombre: "Diseño UX/UI con Figma",
        tipo_evento: "Seminario",
        fecha_inicio: new Date("2023-11-01"),
        fecha_fin: new Date("2023-12-10"),
        modalidad: "Híbrido",
        costo: 120,
        organizador: 3,
        carrera_dirigida: "Diseño Gráfico",
        categoria_area: "Diseño",
        num_horas: 30,
        nota_aprobacion: 70,
        requiere_asistencia: true,
        requiere_nota: false,
        url_foto: "/images/figma-course.jpg",
        id_seccion: 3,
        visible: true,
        descripcion: "Seminario completo de diseño de interfaces con Figma"
      }
    }
  ]

  const filteredCertificates = certificatesWithDetails.filter(cert => {
    const matchesSearch = cert.evento.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.evento.categoria_area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.tipo_certificado.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterBy === "all" || 
                         cert.evento.categoria_area.toLowerCase().includes(filterBy.toLowerCase()) ||
                         cert.evento.tipo_evento.toLowerCase().includes(filterBy.toLowerCase())
    
    return matchesSearch && matchesFilter
  })

  const stats = {
    totalCertificates: certificatesWithDetails.length,
    totalHours: certificatesWithDetails.reduce((sum, cert) => sum + cert.evento.num_horas, 0),
    avgGrade: certificatesWithDetails.filter(cert => cert.calificacion).length > 0 
      ? (certificatesWithDetails
          .filter(cert => cert.calificacion)
          .reduce((sum, cert) => sum + (cert.calificacion || 0), 0) / 
         certificatesWithDetails.filter(cert => cert.calificacion).length).toFixed(1)
      : "N/A",
    categoriesCompleted: [...new Set(certificatesWithDetails.map(cert => cert.evento.categoria_area))].length
  }
  const handleDownload = (certificate: CertificateWithDetails) => {
    console.log(`Descargando certificado: CERT-${certificate.id_certificado}`)
    // Aquí iría la lógica para descargar el certificado desde certificate.url_certificado
    window.open(certificate.url_certificado, '_blank')
  }

  const handleShare = (certificate: CertificateWithDetails) => {
    const shareUrl = `${window.location.origin}/certificates/verify/${certificate.id_certificado}`
    navigator.clipboard.writeText(shareUrl)
    console.log(`URL copiada: ${shareUrl}`)
    // Mostrar notificación de éxito
  }

  const getCertificateTypeColor = (tipo: string) => {
    switch (tipo.toLowerCase()) {
      case "aprobación":
        return "bg-green-100 text-green-800"
      case "participación":
        return "bg-blue-100 text-blue-800"
      case "excelencia":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getModalityIcon = (modalidad: string) => {
    switch (modalidad.toLowerCase()) {
      case "virtual":
        return "💻"
      case "presencial":
        return "🏫"
      case "híbrido":
        return "🔄"
      default:
        return "📚"
    }
  }

  return (
    <div className="space-y-6">      {/* Header con estadísticas */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Mis Certificados</h1>
        <p className="text-muted-foreground mb-6">
          Visualiza y gestiona todos tus certificados de eventos completados
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
                  <Clock className="h-5 w-5 text-blue-600" />
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
                  <p className="text-2xl font-bold text-yellow-600">{stats.avgGrade}</p>
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
                  <p className="text-sm text-muted-foreground">Categorías</p>
                  <p className="text-2xl font-bold text-green-600">{stats.categoriesCompleted}</p>
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
            <div className="flex-1">            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por evento, categoría o tipo de certificado..."
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
                <SelectItem value="all">Todos los filtros</SelectItem>
                <SelectItem value="desarrollo">Desarrollo Web</SelectItem>
                <SelectItem value="data science">Data Science</SelectItem>
                <SelectItem value="diseño">Diseño</SelectItem>
                <SelectItem value="curso">Cursos</SelectItem>
                <SelectItem value="taller">Talleres</SelectItem>
                <SelectItem value="seminario">Seminarios</SelectItem>
              </SelectContent>
            </Select>
          </div>
          </div>
        </CardContent>
      </Card>      {/* Lista de certificados */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id_certificado} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header del certificado */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <Badge variant="secondary" className="text-xs">
                        {certificate.evento.categoria_area}
                      </Badge>
                      <span className="text-lg">{getModalityIcon(certificate.evento.modalidad)}</span>
                      <Badge className={`text-xs ${getCertificateTypeColor(certificate.tipo_certificado)}`}>
                        {certificate.tipo_certificado}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg text-foreground leading-tight">
                      {certificate.evento.nombre}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {certificate.evento.tipo_evento} • {certificate.evento.modalidad}
                    </p>
                  </div>
                  {certificate.calificacion && (
                    <div className="text-right">
                      <div className="text-lg font-bold text-primary">
                        {certificate.calificacion}%
                      </div>
                      <p className="text-xs text-muted-foreground">Calificación</p>
                    </div>
                  )}
                </div>

                {/* Información del certificado */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ID Certificado:</span>
                    <span className="font-mono text-xs">CERT-{certificate.id_certificado.toString().padStart(4, '0')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Fecha de emisión:</span>
                    <span>{certificate.fecha_emision.toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Duración del evento:</span>
                    <span>{certificate.evento.num_horas} horas</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Período:</span>
                    <span>
                      {certificate.evento.fecha_inicio.toLocaleDateString('es-ES')} - {certificate.evento.fecha_fin.toLocaleDateString('es-ES')}
                    </span>
                  </div>
                  {certificate.asistencia_porcentaje && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Asistencia:</span>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-3 w-3 text-green-600" />
                        <span>{certificate.asistencia_porcentaje}%</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Información del evento */}
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm font-medium text-muted-foreground mb-1">Descripción del evento:</p>
                  <p className="text-sm text-foreground">{certificate.evento.descripcion}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Carrera: {certificate.evento.carrera_dirigida}</span>
                    {certificate.evento.requiere_nota && (
                      <span>• Nota mínima: {certificate.evento.nota_aprobacion}%</span>
                    )}
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
                    onClick={() => window.open(`/certificates/verify/${certificate.id_certificado}`, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>      {/* Estado vacío */}
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
                : "Aún no tienes certificados. ¡Completa un evento para obtener tu primer certificado!"}
            </p>
            <Button className="auth-button">
              Explorar eventos disponibles
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
                Todos nuestros certificados son verificables digitalmente y están respaldados por nuestro sistema 
                de inscripciones. Cada certificado incluye información del evento, fecha de emisión y tipo de certificación obtenida.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verificar certificado
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
