"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FormError, FormSuccess, PasswordStrengthIndicator } from "@/components/ui-components"
import { ImageUploadPro } from "@/components/image-upload-pro"
import { SiteLayout } from "@/components/site-layout"
import { registerSchema } from "@/lib/validations/auth"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import '@/app/globals.css'

type RegisterFormValues = z.infer<typeof registerSchema>

export default function RegisterPage() {
  const router = useRouter()
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [interestArea, setInterestArea] = useState("")

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: true,
      profileImage: undefined,
    },
  })

  const password = form.watch("password")

  const onSubmit = async (values: RegisterFormValues) => {
    setError("")
    setSuccess("")
    setIsPending(true)

    try {
      // Simulación de registro
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulación de éxito
      setSuccess("Tu cuenta ha sido creada correctamente")

      // Redireccionar después de un breve retraso
      setTimeout(() => {
        router.push("/login")
      }, 1500)
    } catch (error) {
      setError("Ocurrió un error al crear tu cuenta. Por favor, inténtalo de nuevo.")
    } finally {
      setIsPending(false)
    }
  }

  const handleImageChange = (file: File | null) => {
    form.setValue("profileImage", file || undefined)
  }

  return (
    <SiteLayout>
      <div className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container px-4 mx-auto">
          <Card className="w-full max-w-md mx-auto auth-card">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-primary">Inscríbete en EduEvents</CardTitle>
              <CardDescription>Crea tu cuenta para acceder a eventos y cursos exclusivos</CardDescription>
            </CardHeader>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-center block">Foto de perfil</Label>
                  <ImageUploadPro
                    onChange={handleImageChange}
                    error={form.formState.errors.profileImage?.message?.toString()}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input
                      id="firstName"
                      placeholder="Juan"
                      className="auth-input"
                      disabled={isPending}
                      {...form.register("firstName")}
                    />
                    <FormError message={form.formState.errors.firstName?.message} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      placeholder="Pérez"
                      className="auth-input"
                      disabled={isPending}
                      {...form.register("lastName")}
                    />
                    <FormError message={form.formState.errors.lastName?.message} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ejemplo@correo.com"
                    className="auth-input"
                    disabled={isPending}
                    {...form.register("email")}
                  />
                  <FormError message={form.formState.errors.email?.message} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="interestArea">Área de interés</Label>
                  <Select value={interestArea} onValueChange={setInterestArea} disabled={isPending}>
                    <SelectTrigger className="auth-input">
                      <SelectValue placeholder="Selecciona un área" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Desarrollo de software</SelectItem>
                      <SelectItem value="design">Diseño UX/UI</SelectItem>
                      <SelectItem value="marketing">Marketing digital</SelectItem>
                      <SelectItem value="business">Negocios y emprendimiento</SelectItem>
                      <SelectItem value="data">Ciencia de datos</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="auth-input pr-10"
                      disabled={isPending}
                      {...form.register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FormError message={form.formState.errors.password?.message} />
                  <PasswordStrengthIndicator password={password} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="auth-input pr-10"
                      disabled={isPending}
                      {...form.register("confirmPassword")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  <FormError message={form.formState.errors.confirmPassword?.message} />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    className="border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                    disabled={isPending}
                    {...form.register("terms")}
                  />
                  <Label htmlFor="terms" className="text-sm font-normal">
                    Acepto los{" "}
                    <Link href="/terms" className="text-primary hover:underline font-medium">
                      términos y condiciones
                    </Link>
                  </Label>
                </div>
                <FormError message={form.formState.errors.terms?.message} />
                <FormError message={error} />
                <FormSuccess message={success} />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full auth-button" type="submit" disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    "Inscribirse"
                  )}
                </Button>
                <div className="text-center text-sm">
                  ¿Ya tienes una cuenta?{" "}
                  <Link href="/login" className="text-primary hover:underline font-medium">
                    Acceder
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </SiteLayout>
  )
}
