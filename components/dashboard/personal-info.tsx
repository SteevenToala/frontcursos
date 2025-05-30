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
import User from "../../app/models/User"
import { 
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  Edit,
  Save,
  X,
  Camera
} from "lucide-react"

interface PersonalInfoProps {
  user: User
}

export function PersonalInfo({ user }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user.nombres || "",
    lastName: user.apellidos || "",
    email: user.correo || "",
    phone: user.telefono || "",
    address: user.direccion || "",
    career: user.carrera || "",
    profileImage: user.url_foto || ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios
    console.log("Guardando cambios:", formData)
    setIsEditing(false)
    // Actualizar usuario en el storage o enviar al backend
  }

  const handleCancel = () => {
    // Restaurar datos originales
    setFormData({
      firstName: user.nombres || "",
      lastName: user.apellidos || "",
      email: user.correo || "",
      phone: user.telefono || "",
      address: user.direccion || "",
      career: user.carrera || "",
      profileImage: user.url_foto || ""
    })
    setIsEditing(false)
  }

  const accountInfo = {
    memberSince: "Enero 2024",
    lastLogin: "10 Febrero 2024",
    accountStatus: "Activo",
    totalCourses: 5,
    completedCourses: 3,
    certificates: 2
  }

  return (
    <div className="space-y-6">
      {/* Header */}
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
        {/* Foto de perfil y datos básicos */}
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
                  {formData.profileImage ? (
                    <img 
                      src={formData.profileImage} 
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
                  {formData.firstName} {formData.lastName}
                </h3>
                <p className="text-muted-foreground">{formData.career}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Miembro desde {accountInfo.memberSince}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Estadísticas de cuenta */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Estadísticas de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estado</span>
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {accountInfo.accountStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cursos totales</span>
                <span className="font-semibold">{accountInfo.totalCourses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Completados</span>
                <span className="font-semibold">{accountInfo.completedCourses}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Certificados</span>
                <span className="font-semibold">{accountInfo.certificates}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Último acceso</span>
                <span className="text-sm">{accountInfo.lastLogin}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información personal detallada */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Datos Personales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nombre</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="auth-input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.firstName}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="auth-input"
                    />
                  ) : (
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <UserIcon className="h-4 w-4 text-muted-foreground" />
                      <span>{formData.lastName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="auth-input"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{formData.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="auth-input"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{formData.phone}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección</Label>
                {isEditing ? (
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="auth-input"
                  />
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{formData.address}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="career">Área de Interés</Label>
                {isEditing ? (
                  <Select value={formData.career} onValueChange={(value) => handleInputChange("career", value)}>
                    <SelectTrigger className="auth-input">
                      <SelectValue placeholder="Selecciona un área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Desarrollo de software">Desarrollo de software</SelectItem>
                      <SelectItem value="Diseño UX/UI">Diseño UX/UI</SelectItem>
                      <SelectItem value="Marketing digital">Marketing digital</SelectItem>
                      <SelectItem value="Negocios y emprendimiento">Negocios y emprendimiento</SelectItem>
                      <SelectItem value="Ciencia de datos">Ciencia de datos</SelectItem>
                      <SelectItem value="Otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{formData.career}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Configuración de cuenta */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Configuración de Cuenta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">Notificaciones por email</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibe actualizaciones sobre tus cursos y eventos
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
