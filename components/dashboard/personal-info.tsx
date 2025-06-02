import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../ui/select"
import { Badge } from "../ui/badge"
import User from "../../app/models/User"
import { 
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Edit,
  Save,
  X,
  Camera,
  CreditCard,
  Shield
} from "lucide-react"

interface PersonalInfoProps {
  user: User
}

export function PersonalInfo({ user }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    nombres: user.nombres || "",
    apellidos: user.apellidos || "",
    correo: user.correo || user.email || "",
    cedula: user.cedula || "",
    telefono: user.telefono || "",
    direccion: user.direccion || "",
    carrera: user.carrera || "",
    url_foto: user.url_foto || user.urlUserImg || ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("Guardando cambios:", formData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      nombres: user.nombres || "",
      apellidos: user.apellidos || "",
      correo: user.correo || user.email || "",
      cedula: user.cedula || "",
      telefono: user.telefono || "",
      direccion: user.direccion || "",
      carrera: user.carrera || "",
      url_foto: user.url_foto || user.urlUserImg || ""
    })
    setIsEditing(false)
  }

  const accountInfo = {
    memberSince: "Enero 2024",
    lastLogin: "10 Febrero 2024",
    totalEvents: 5,
    completedEvents: 3,
    certificates: 2,
    attendances: 15
  }

  const getUserRole = (rol: string) => {
    const roles = {
      'admin': { label: 'Administrador', color: 'bg-red-100 text-red-800' },
      'instructor': { label: 'Instructor', color: 'bg-blue-100 text-blue-800' },
      'estudiante': { label: 'Estudiante', color: 'bg-green-100 text-green-800' }
    }
    return roles[rol as keyof typeof roles] || { label: 'Usuario', color: 'bg-gray-100 text-gray-800' }
  }

  const getStatusBadge = (estado: string) => {
    const statuses = {
      'activo': { label: 'Activo', color: 'bg-green-100 text-green-800' },
      'inactivo': { label: 'Inactivo', color: 'bg-red-100 text-red-800' },
      'suspendido': { label: 'Suspendido', color: 'bg-yellow-100 text-yellow-800' }
    }
    return statuses[estado as keyof typeof statuses] || { label: 'Sin definir', color: 'bg-gray-100 text-gray-800' }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Información Personal</h1>
          <p className="text-muted-foreground">
            Gestiona tu perfil y preferencias de cuenta
          </p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="auth-button">
            <Edit className="h-4 w-4 mr-2" />
            Editar Perfil
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave} className="auth-button">
              <Save className="h-4 w-4 mr-2" />
              Guardar
            </Button>
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                Foto de Perfil
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto overflow-hidden">
                  {formData.url_foto ? (
                    <img 
                      src={formData.url_foto} 
                      alt="Perfil" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="h-16 w-16 text-primary" />
                  )}
                </div>
                {isEditing && (
                  <Button 
                    size="sm" 
                    className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                    variant="default"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground">
                  {`${formData.nombres} ${formData.apellidos}` || user.username}
                </h3>
                <div className="flex justify-center mt-2">
                  <Badge className={`${getUserRole(user.rol).color} text-xs`}>
                    {getUserRole(user.rol).label}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Miembro desde {accountInfo.memberSince}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Estadísticas de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estado</span>
                <Badge className={`${getStatusBadge(user.estado).color} text-xs`}>
                  {getStatusBadge(user.estado).label}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Eventos totales</span>
                <span className="font-semibold">{accountInfo.totalEvents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completados</span>
                <span className="font-semibold">{accountInfo.completedEvents}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Certificados</span>
                <span className="font-semibold">{accountInfo.certificates}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Asistencias</span>
                <span className="font-semibold">{accountInfo.attendances}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Último acceso</span>
                <span className="text-sm">{accountInfo.lastLogin}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombres">Nombres</Label>
                  {isEditing ? (
                    <Input
                      id="nombres"
                      value={formData.nombres}
                      onChange={(e) => handleInputChange("nombres", e.target.value)}
                      className="auth-input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.nombres}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="apellidos">Apellidos</Label>
                  {isEditing ? (
                    <Input
                      id="apellidos"
                      value={formData.apellidos}
                      onChange={(e) => handleInputChange("apellidos", e.target.value)}
                      className="auth-input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.apellidos}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="correo">Correo Electrónico</Label>
                  {isEditing ? (
                    <Input
                      id="correo"
                      type="email"
                      value={formData.correo}
                      onChange={(e) => handleInputChange("correo", e.target.value)}
                      className="auth-input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.correo}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cedula">Cédula</Label>
                  {isEditing ? (
                    <Input
                      id="cedula"
                      value={formData.cedula}
                      onChange={(e) => handleInputChange("cedula", e.target.value)}
                      className="auth-input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <CreditCard className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.cedula}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  {isEditing ? (
                    <Input
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      className="auth-input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.telefono}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carrera">Carrera</Label>
                  {isEditing ? (
                    <Select 
                      value={formData.carrera} 
                      onValueChange={(value) => handleInputChange("carrera", value)}
                    >
                      <SelectTrigger className="auth-input">
                        <SelectValue placeholder="Selecciona tu carrera" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ingenieria_sistemas">Ingeniería de Sistemas</SelectItem>
                        <SelectItem value="ingenieria_civil">Ingeniería Civil</SelectItem>
                        <SelectItem value="ingenieria_industrial">Ingeniería Industrial</SelectItem>
                        <SelectItem value="administracion">Administración de Empresas</SelectItem>
                        <SelectItem value="contaduria">Contaduría Pública</SelectItem>
                        <SelectItem value="derecho">Derecho</SelectItem>
                        <SelectItem value="psicologia">Psicología</SelectItem>
                        <SelectItem value="medicina">Medicina</SelectItem>
                        <SelectItem value="otra">Otra</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.carrera}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="direccion">Dirección</Label>
                {isEditing ? (
                  <Input
                    id="direccion"
                    value={formData.direccion}
                    onChange={(e) => handleInputChange("direccion", e.target.value)}
                    className="auth-input"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{formData.direccion}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Estado de Verificación</Label>
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <Badge className={`${
                    user.verify ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  } text-xs`}>
                    {user.verify ? 'Verificado' : 'Pendiente de verificación'}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Configuración de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Notificaciones por email</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe actualizaciones sobre tus eventos y certificados
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configurar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Privacidad del perfil</h4>
                  <p className="text-sm text-muted-foreground">
                    Controla quién puede ver tu información
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Gestionar
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Cambiar contraseña</h4>
                  <p className="text-sm text-muted-foreground">
                    Actualiza tu contraseña de acceso
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Cambiar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
