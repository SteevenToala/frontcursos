"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as eventosService from "../../Services/eventosService";
import { SiteLayout } from "@/components/site-layout";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, User, Heart, Share2, DollarSign } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import '../../globals.css'

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

export default function DetalleEventoPage() {
  const { id_evento } = useParams();
  const [evento, setEvento] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvento() {
      try {
        const data = await eventosService.getEventos();
        // Busca el evento por ID (asegúrate de comparar como string)
        const encontrado = data.find((e: any) => String(e.id_evento) === String(id_evento));
        console.log("Evento encontrado:", encontrado);
        setEvento(encontrado || null);
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

  // Puedes calcular descuentos, asistentes, etc., aquí si tu backend lo provee
  const asistentes = evento.asistentes || 0;
  const maxAsistentes = evento.max_asistentes || 100;
  const discountPercentage = evento.descuento || 0;

  return (
    <SiteLayout>
      <div className="container px-4 mx-auto py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link href="/events" className="hover:text-primary flex items-center">
            {/* Puedes usar un icono de flecha si tienes uno */}
            ← Volver a eventos
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header del evento */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Badge className="bg-primary">{evento.categoria}</Badge>
                {evento.destacado && <Badge variant="outline">Destacado</Badge>}
              </div>
              <h1 className="text-3xl font-bold mb-4">{evento.nombre}</h1>
              <p className="text-lg text-muted-foreground mb-6">{evento.descripcion}</p>

              {/* Información básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{formatFecha(evento.fechaInicio)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatHora(evento.fechaInicio)} - {formatHora(evento.fechaFin)}
                      </p>
                    </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{evento.lugar || evento.modalidad}</p>
                    <p className="text-sm text-muted-foreground">{evento.direccion || ""}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{asistentes} asistentes confirmados</p>
                    <p className="text-sm text-muted-foreground">de {maxAsistentes} plazas disponibles</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Duración: {evento.numeroHoras || "N/A"} horas</p>
                    <p className="text-sm text-muted-foreground">Incluye descansos</p>
                  </div>
                </div>
              </div>

              {/* Imagen del evento */}
              <div className="relative h-64 md:h-80 rounded-lg overflow-hidden mb-8">
                <Image
                  src={evento.urlfoto || "/placeholder.svg"}
                  alt={evento.nombre}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Descripción completa */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle>Sobre este evento</CardTitle>
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

            {/* Ponentes, Agenda, Amenities, Reseñas... puedes añadir bloques similares aquí si tienes esos datos */}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Card de reserva */}
            <Card className="border-primary/10 sticky top-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        {evento.costo ? `$${evento.costo}` : "Gratis"}
                      </span>
                      {evento.precio_original && evento.precio_original > evento.costo && (
                        <span className="text-lg text-muted-foreground line-through">
                          ${evento.precio_original}
                        </span>
                      )}
                    </div>
                    {discountPercentage > 0 && (
                      <Badge variant="destructive" className="mt-1">
                        {discountPercentage}% descuento
                      </Badge>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full auth-button" size="lg">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Reservar ahora
                </Button>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {maxAsistentes - asistentes} plazas disponibles
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(asistentes / maxAsistentes) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  <p>✓ Cancelación gratuita hasta 48h antes</p>
                  <p>✓ Confirmación inmediata</p>
                  <p>✓ Certificado de asistencia incluido</p>
                </div>
              </CardContent>
            </Card>

            {/* Organizador */}
            <Card className="border-primary/10">
              <CardHeader>
                <CardTitle className="text-lg">Organizador</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">{evento.organizador_nombre || `#${evento.id_organizador}`}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{evento.organizador_descripcion || ""}</p>
                    <Button variant="outline" size="sm" className="w-full">
                      Ver perfil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
