"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as sectionsService from "../../../Services/sectionsService";
import { SiteLayout } from "@/components/site-layout";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, DollarSign, ArrowLeft, CheckCircle, Star, AlertCircle, BookOpen} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator"
import '../../../globals.css'

function formatFecha(fechaStr: string) {
  if (!fechaStr) return "";
  const fecha = new Date(fechaStr);
  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatHora(fechaStr: string) {
  if (!fechaStr) return "";
  const fecha = new Date(fechaStr);
  return fecha.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function calcularDuracion(fechaInicio: string, fechaFin: string) {
  const inicio = new Date(fechaInicio)
  const fin = new Date(fechaFin)
  const diferencia = fin.getTime() - inicio.getTime()
  const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24))
  return dias
}

export default function DetalleEventoPage() {
  const { id_evento } = useParams();
  const [evento, setEvento] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvento() {
      try {
        // Busca el evento por ID
        const eventoEncontrado = await sectionsService.getEventoPorId(String(id_evento));
        console.log("Evento encontrado:", eventoEncontrado);
        setEvento(eventoEncontrado);
      } catch (error) {
        setEvento(null);
      } finally {
        setLoading(false);
      }
    }
    fetchEvento();
  }, [id_evento]);

  if (loading) {
    return <SiteLayout><div className="text-center py-16">Cargando evento...</div></SiteLayout>;
  }

  if (!evento) {
    return <SiteLayout><div className="text-center py-16">Evento no encontrado.</div></SiteLayout>;
  }

  const duracionDias = calcularDuracion(evento.fechaInicio, evento.fechaFin)

  // Puedes calcular descuentos, asistentes, etc., aquí si tu backend lo provee
  const asistentes = evento.asistentes || 0;
  const maxAsistentes = evento.max_asistentes || 100;
  const discountPercentage = evento.descuento || 0;

  return (
    <SiteLayout>
      <div className="container px-4 mx-auto py-8">
        {/* Navegación */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Button variant="ghost" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Imagen principal */}
            <div className="relative h-96 rounded-xl overflow-hidden">
              <Image
                  src={evento.urlFoto || "/placeholder.svg?height=400&width=600"}
                  alt={evento.nombre}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">{evento.tipoEvento}</Badge>
                  <Badge className="bg-primary">{evento.categoria}</Badge>
                  {evento.requiereAsistencia && (
                    <Badge variant="destructive">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Asistencia obligatoria
                    </Badge>
                  )}
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-2">{evento.nombre}</h1>
                </div>
              <h1 className="text-3xl font-bold mb-4">{evento.nombre}</h1>
              <p className="text-lg text-muted-foreground mb-6">{evento.descripcion}</p>
            </div>

            {/* Descripción completa */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Descripción del evento</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {(evento.descripcion_larga || evento.descripcion || "").split("\n").map((paragraph: string, index: number) => (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detalles adicionales */}
            <Card>
              <CardHeader>
                <CardTitle>Información importante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {evento.requiereAsistencia && (
                  <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Asistencia obligatoria</h4>
                      <p className="text-sm text-orange-700">
                        Este evento requiere asistencia presencial para obtener la certificación.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Star className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800">Nota mínima de aprobación</h4>
                    <p className="text-sm text-blue-700">
                      Necesitas obtener al menos {evento.notaAprovacion} puntos para aprobar este evento.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Información del evento */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Detalles del evento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Fecha de inicio</h4>
                  <p className="text-sm text-muted-foreground capitalize">{formatFecha(evento.fechaInicio)}</p>
                  <p className="text-sm text-muted-foreground">{formatHora(evento.fechaInicio)}</p>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-1">Fecha de finalización</h4>
                  <p className="text-sm text-muted-foreground capitalize">{formatFecha(evento.fechaFin)}</p>
                  <p className="text-sm text-muted-foreground">{formatHora(evento.fechaFin)}</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm">Duración</span>
                  </div>
                  <span className="font-medium">{duracionDias} días</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <span className="text-sm">Horas académicas</span>
                  </div>
                  <span className="font-medium">{evento.numeroHoras}h</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">Modalidad</span>
                  </div>
                  <Badge variant="outline">{evento.modalidad}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Precio y registro */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Precio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {evento.costo === 0 ? "Gratis" : `$${evento.costo}`}
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">
                    {evento.costo === 0 ? "Evento gratuito" : "Precio por persona"}
                  </p>
                  <Button className="w-full" size="lg">
                    Inscribirse ahora
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Confirma tu participación</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
