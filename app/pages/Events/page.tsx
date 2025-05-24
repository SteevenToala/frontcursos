"use client";
import Link from "next/link"
import Image from "next/image"
import { SiteLayout } from "@/components/site-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import '../../globals.css'
import * as eventosService from "../../Services/eventosService";

export default function EventsPage() {

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Datos de para eventos
  useEffect(() => {
    async function fetchEventos() {
      try {
        const data = await eventosService.getEventos();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEventos();
  }, []);


    // Loader mientras carga
  if (loading) {
    return (
      <SiteLayout>
        <div className="flex justify-center items-center min-h-[50vh]">
          <span className="text-lg text-muted-foreground">Cargando eventos...</span>
        </div>
      </SiteLayout>
    );
  }

  // Si no hay eventos, mensaje amigable
  if (!events.length) {
    return (
      <SiteLayout>
        <section className="container mx-auto py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Eventos</h1>
          <p className="mb-8 text-muted-foreground">
            No hay eventos disponibles en este momento. ¡Vuelve pronto!
          </p>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-b from-red-50 to-white">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Eventos</h1>
            <p className="text-muted-foreground mb-8">
              Descubre conferencias, workshops y meetups diseñados para impulsar tu carrera profesional y conectar con
              expertos de la industria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar eventos..." className="pl-10 auth-input" />
              </div>
              <Button variant="outline" className="border-primary/30 text-primary">
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-12 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl font-bold mb-8">Eventos destacados</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {events
              .filter((event) => event.featured)
              .slice(0, 2)
              .map((event) => (
                <div
                  key={event.id_evento}
                  className="flex flex-col md:flex-row bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="md:w-2/5 relative h-60 md:h-auto">
                    <Image
                      src={event.url_foto || "/placeholder.svg"}
                      alt={event.nombre}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">{event.categoria}</Badge>
                  </div>
                  <div className="md:w-3/5 p-6">
                    <h3 className="font-bold text-xl mb-2">{event.nombre}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{event.descripcion}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {event.fecha_inicio} - {event.fecha_fin}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.modalidad}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.id_organizador ? "Organizador #" + event.id_organizador : ""}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{event.costo ? `$${event.costo}` : "Gratis"}</span>
                      <Button asChild className="auth-button">
                        <Link href={`/events/${event.id_evento}`}>Ver detalles</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* All Events */}
      <section className="py-12 bg-red-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-2xl font-bold mb-8">Todos los eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event.id_evento}
                className="bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={event.url_foto || "/placeholder.svg"}
                    alt={event.nombre}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary">{event.categoria}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.nombre}</h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{event.descripcion}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        {event.fecha_inicio} - {event.fecha_fin}
                      </span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.modalidad}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{event.costo ? `$${event.costo}` : "Gratis"}</span>
                    <Button asChild className="auth-button">
                      <Link href={`/events/${event.id_evento}`}>Ver detalles</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button variant="outline" className="border-primary/30 text-primary">
              Cargar más eventos
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">¿Quieres organizar un evento?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Si eres un experto en tu campo y quieres compartir tu conocimiento, podemos ayudarte a organizar y promover
            tu evento.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link href="/contact">Contactar</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link href="/host-guide">Guía para organizadores</Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}