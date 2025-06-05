"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/app/hooks/use-toast"
import {
  UserPlus,
  Users,
  Eye,
  EyeOff,
  Loader2,
  RefreshCw,
  AlertCircle,
  Trash2,
  Shield,
  Mail,
  Phone,
  Calendar,
} from "lucide-react"

// Tipos
interface Usuario {
  id: number
  nombres: string
  apellidos: string
  correo: string
  telefono?: string
  rol: string
  estado: "Activo" | "Inactivo"
  fechaCreacion: string
  ultimoAcceso?: string
}

interface FormularioUsuario {
  nombres: string
  apellidos: string
  correo: string
  telefono: string
  contraseña: string
  confirmarContraseña: string
  rol: string
  descripcion: string
}

// Servicio para usuarios
class UsuarioService {
  private static getAuthHeaders(): HeadersInit {
    const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null
    let token = ""

    if (userStr) {
      try {
        const user = JSON.parse(userStr)
        token = user.token || ""
      } catch (error) {
        console.error("Error parsing user from storage:", error)
      }
    }

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  static async crearUsuario(usuario: Omit<FormularioUsuario, "confirmarContraseña">): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/crear-admin`, {
        method: "POST",
        headers: this.getAuthHeaders(),
        body: JSON.stringify(usuario),
      })

      if (!response.ok) {
        let errorMessage = `Error ${response.status}: ${response.statusText}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorData.error || errorMessage
        } catch {
          // Si no se puede parsear el JSON, usar el mensaje por defecto
        }
        throw new Error(errorMessage)
      }

      return true
    } catch (error) {
      console.error("Error al crear usuario:", error)
      if (error instanceof Error) {
        throw error
      }
      throw new Error("Error de conexión al crear el usuario")
    }
  }

  static async obtenerUsuarios(): Promise<Usuario[]> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/administradores`, {
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error("Error al obtener usuarios")
      }

      return response.json()
    } catch (error) {
      console.error("Error al obtener usuarios:", error)
      throw new Error("No se pudieron cargar los usuarios")
    }
  }

  static async eliminarUsuario(id: number): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/${id}`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error("Error al eliminar usuario")
      }

      return true
    } catch (error) {
      console.error("Error al eliminar usuario:", error)
      throw new Error("No se pudo eliminar el usuario")
    }
  }

  static async actualizarEstadoUsuario(id: number, estado: "Activo" | "Inactivo"): Promise<boolean> {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/usuarios/${id}/estado`, {
        method: "PUT",
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ estado }),
      })

      if (!response.ok) {
        throw new Error("Error al actualizar estado del usuario")
      }

      return true
    } catch (error) {
      console.error("Error al actualizar estado:", error)
      throw new Error("No se pudo actualizar el estado del usuario")
    }
  }
}

export default function CrearUsuariosAdmin() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mostrarContraseña, setMostrarContraseña] = useState(false)
  const [mostrarConfirmarContraseña, setMostrarConfirmarContraseña] = useState(false)
  const [modalEliminar, setModalEliminar] = useState<{ visible: boolean; usuario: Usuario | null }>({
    visible: false,
    usuario: null,
  })
  const { toast } = useToast()

  const [formulario, setFormulario] = useState<FormularioUsuario>({
    nombres: "",
    apellidos: "",
    correo: "",
    telefono: "",
    contraseña: "",
    confirmarContraseña: "",
    rol: "Administrador",
    descripcion: "",
  })

  const [erroresValidacion, setErroresValidacion] = useState<Partial<FormularioUsuario>>({})

  const cargarUsuarios = async () => {
    try {
      setLoading(true)
      setError(null)
      const usuariosData = await UsuarioService.obtenerUsuarios()
      setUsuarios(usuariosData)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      setError(errorMessage)
      toast({
        variant: "destructive",
        title: "Error al cargar usuarios",
        description: errorMessage,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const validarFormulario = (): boolean => {
    const errores: Partial<FormularioUsuario> = {}

    if (!formulario.nombres.trim()) errores.nombres = "Los nombres son requeridos"
    if (!formulario.apellidos.trim()) errores.apellidos = "Los apellidos son requeridos"
    if (!formulario.correo.trim()) {
      errores.correo = "El correo es requerido"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formulario.correo)) {
      errores.correo = "El correo no tiene un formato válido"
    }
    if (!formulario.contraseña) {
      errores.contraseña = "La contraseña es requerida"
    } else if (formulario.contraseña.length < 8) {
      errores.contraseña = "La contraseña debe tener al menos 8 caracteres"
    }
    if (formulario.contraseña !== formulario.confirmarContraseña) {
      errores.confirmarContraseña = "Las contraseñas no coinciden"
    }
    if (!formulario.rol) errores.rol = "El rol es requerido"

    setErroresValidacion(errores)
    return Object.keys(errores).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validarFormulario()) {
      toast({
        variant: "destructive",
        title: "Errores en el formulario",
        description: "Por favor corrige los errores antes de continuar",
      })
      return
    }

    setSubmitting(true)

    try {
      const { confirmarContraseña, ...usuarioData } = formulario
      await UsuarioService.crearUsuario(usuarioData)

      toast({
        title: "Usuario creado exitosamente",
        description: `El usuario ${formulario.nombres} ${formulario.apellidos} ha sido creado correctamente`,
      })

      // Limpiar formulario
      setFormulario({
        nombres: "",
        apellidos: "",
        correo: "",
        telefono: "",
        contraseña: "",
        confirmarContraseña: "",
        rol: "Administrador",
        descripcion: "",
      })
      setErroresValidacion({})

      // Recargar usuarios
      await cargarUsuarios()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast({
        variant: "destructive",
        title: "Error al crear usuario",
        description: errorMessage,
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleEliminarUsuario = async () => {
    if (!modalEliminar.usuario) return

    try {
      await UsuarioService.eliminarUsuario(modalEliminar.usuario.id)
      toast({
        title: "Usuario eliminado",
        description: "El usuario ha sido eliminado correctamente",
      })
      setModalEliminar({ visible: false, usuario: null })
      await cargarUsuarios()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast({
        variant: "destructive",
        title: "Error al eliminar usuario",
        description: errorMessage,
      })
    }
  }

  const handleCambiarEstado = async (usuario: Usuario) => {
    const nuevoEstado = usuario.estado === "Activo" ? "Inactivo" : "Activo"

    try {
      await UsuarioService.actualizarEstadoUsuario(usuario.id, nuevoEstado)
      toast({
        title: "Estado actualizado",
        description: `El usuario ha sido ${nuevoEstado.toLowerCase()}`,
      })
      await cargarUsuarios()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido"
      toast({
        variant: "destructive",
        title: "Error al actualizar estado",
        description: errorMessage,
      })
    }
  }

  const handleInputChange = (field: keyof FormularioUsuario, value: string) => {
    setFormulario((prev) => ({ ...prev, [field]: value }))
    // Limpiar error de validación cuando el usuario empiece a escribir
    if (erroresValidacion[field]) {
      setErroresValidacion((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestión de Usuarios Administradores</h1>
            <p className="text-muted-foreground mt-2">Crea y administra usuarios con permisos de administrador</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={cargarUsuarios} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Actualizar
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{usuarios.length} usuarios</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de creación */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Crear Nuevo Usuario
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombres">Nombres *</Label>
                      <Input
                        id="nombres"
                        value={formulario.nombres}
                        onChange={(e) => handleInputChange("nombres", e.target.value)}
                        placeholder="Nombres"
                        className={erroresValidacion.nombres ? "border-destructive" : ""}
                      />
                      {erroresValidacion.nombres && (
                        <p className="text-sm text-destructive">{erroresValidacion.nombres}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellidos">Apellidos *</Label>
                      <Input
                        id="apellidos"
                        value={formulario.apellidos}
                        onChange={(e) => handleInputChange("apellidos", e.target.value)}
                        placeholder="Apellidos"
                        className={erroresValidacion.apellidos ? "border-destructive" : ""}
                      />
                      {erroresValidacion.apellidos && (
                        <p className="text-sm text-destructive">{erroresValidacion.apellidos}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo Electrónico *</Label>
                    <Input
                      id="correo"
                      type="email"
                      value={formulario.correo}
                      onChange={(e) => handleInputChange("correo", e.target.value)}
                      placeholder="correo@ejemplo.com"
                      className={erroresValidacion.correo ? "border-destructive" : ""}
                    />
                    {erroresValidacion.correo && <p className="text-sm text-destructive">{erroresValidacion.correo}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono</Label>
                    <Input
                      id="telefono"
                      value={formulario.telefono}
                      onChange={(e) => handleInputChange("telefono", e.target.value)}
                      placeholder="+57 300 123 4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contraseña">Contraseña *</Label>
                    <div className="relative">
                      <Input
                        id="contraseña"
                        type={mostrarContraseña ? "text" : "password"}
                        value={formulario.contraseña}
                        onChange={(e) => handleInputChange("contraseña", e.target.value)}
                        placeholder="Mínimo 8 caracteres"
                        className={erroresValidacion.contraseña ? "border-destructive pr-10" : "pr-10"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setMostrarContraseña(!mostrarContraseña)}
                      >
                        {mostrarContraseña ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {erroresValidacion.contraseña && (
                      <p className="text-sm text-destructive">{erroresValidacion.contraseña}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmarContraseña">Confirmar Contraseña *</Label>
                    <div className="relative">
                      <Input
                        id="confirmarContraseña"
                        type={mostrarConfirmarContraseña ? "text" : "password"}
                        value={formulario.confirmarContraseña}
                        onChange={(e) => handleInputChange("confirmarContraseña", e.target.value)}
                        placeholder="Confirma tu contraseña"
                        className={erroresValidacion.confirmarContraseña ? "border-destructive pr-10" : "pr-10"}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setMostrarConfirmarContraseña(!mostrarConfirmarContraseña)}
                      >
                        {mostrarConfirmarContraseña ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                    {erroresValidacion.confirmarContraseña && (
                      <p className="text-sm text-destructive">{erroresValidacion.confirmarContraseña}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="rol">Rol *</Label>
                    <Select value={formulario.rol} onValueChange={(value) => handleInputChange("rol", value)}>
                      <SelectTrigger className={erroresValidacion.rol ? "border-destructive" : ""}>
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                        <SelectItem value="Super Administrador">Super Administrador</SelectItem>
                        <SelectItem value="Moderador">Moderador</SelectItem>
                      </SelectContent>
                    </Select>
                    {erroresValidacion.rol && <p className="text-sm text-destructive">{erroresValidacion.rol}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descripcion">Descripción</Label>
                    <Textarea
                      id="descripcion"
                      value={formulario.descripcion}
                      onChange={(e) => handleInputChange("descripcion", e.target.value)}
                      placeholder="Descripción opcional del usuario..."
                      rows={3}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={submitting}>
                    {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    <UserPlus className="h-4 w-4 mr-2" />
                    Crear Usuario
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Lista de usuarios */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Usuarios Administradores
                </CardTitle>
              </CardHeader>
              <CardContent>
                {error ? (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="flex items-center justify-between">
                      <span>{error}</span>
                      <Button variant="outline" size="sm" onClick={cargarUsuarios}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Reintentar
                      </Button>
                    </AlertDescription>
                  </Alert>
                ) : loading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin mr-2" />
                    <span>Cargando usuarios...</span>
                  </div>
                ) : usuarios.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No hay usuarios</h3>
                    <p className="text-muted-foreground">Crea el primer usuario administrador</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Usuario</TableHead>
                          <TableHead>Contacto</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Fecha Creación</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usuarios.map((usuario) => (
                          <TableRow key={usuario.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <Shield className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {usuario.nombres} {usuario.apellidos}
                                  </p>
                                  <p className="text-sm text-muted-foreground">ID: {usuario.id}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1 text-sm">
                                  <Mail className="h-3 w-3" />
                                  <span>{usuario.correo}</span>
                                </div>
                                {usuario.telefono && (
                                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                    <Phone className="h-3 w-3" />
                                    <span>{usuario.telefono}</span>
                                  </div>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{usuario.rol}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant={usuario.estado === "Activo" ? "default" : "secondary"}>
                                {usuario.estado}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(usuario.fechaCreacion).toLocaleDateString()}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleCambiarEstado(usuario)}>
                                  {usuario.estado === "Activo" ? "Desactivar" : "Activar"}
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setModalEliminar({ visible: true, usuario })}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Modal de confirmación para eliminar */}
        <Dialog
          open={modalEliminar.visible}
          onOpenChange={(open) => setModalEliminar({ visible: open, usuario: null })}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar eliminación</DialogTitle>
              <DialogDescription>
                ¿Estás seguro de que deseas eliminar al usuario{" "}
                <strong>
                  {modalEliminar.usuario?.nombres} {modalEliminar.usuario?.apellidos}
                </strong>
                ? Esta acción no se puede deshacer.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setModalEliminar({ visible: false, usuario: null })}>
                Cancelar
              </Button>
              <Button variant="destructive" onClick={handleEliminarUsuario}>
                <Trash2 className="h-4 w-4 mr-2" />
                Eliminar Usuario
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
