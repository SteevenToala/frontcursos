"use client";
import Link from "next/link"
import Image from "next/image"
import { SiteLayout } from "@/components/site-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search, Filter } from "lucide-react"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import '../globals.css'
import * as eventosService from "../Services/eventosService";
import { EventFilters } from "@/components/ui/filters";


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

export default function EventsPage() {

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState<string[]>([]);
  const [modalidad, setModalidad] = useState("");
  const [openFilter, setOpenFilter] = useState<string | null>(null);
  const [precioSeleccionado, setPrecioSeleccionado] = useState<{ min: number; max: number | null }>({ min: 0, max: null });
  const [precioMin, setPrecioMin] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [modalidades, setModalidades] = useState<string[]>([]);
  const [categoriasLoading, setCategoriasLoading] = useState(true);
  const [precioMinRange, setPrecioMinRange] = useState(0);
  const [precioMaxRange, setPrecioMaxRange] = useState(1000);

  const filteredEvents = events.filter(event =>
    event.nombre.toLowerCase().includes(search.toLowerCase()) ||
    event.categoria.toLowerCase().includes(search.toLowerCase()) ||
    (event.descripcion && event.descripcion.toLowerCase().includes(search.toLowerCase()))
  )
  .filter(event =>
    categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(event.categoria?.toLowerCase())
  )
  .filter(event =>
    !modalidad || event.modalidad?.toLowerCase() === modalidad.toLowerCase()
  )
  .filter(event => {
    if (precioSeleccionado.min > 0 && event.costo < precioSeleccionado.min) return false;
    if (precioSeleccionado.max !== null && event.costo > precioSeleccionado.max) return false;
    return true;
  });
  
  const filters = [
    {
      key: "Categoria" as const,
      label: "Categoría",
      options: categorias,
      type: "checkbox" as const,
    },
    {
      key: "Modalidad" as const,
      label: "Modalidad", 
      options: modalidades,
      type: "radio" as const,
    },
    {
      key: "Precio" as const,
      label: "Precio",
      options: [],
      type: "range" as const,
    }
  ];

  // Datos de para eventos
  useEffect(() => {
    async function fetchEventos() {
      try {
        const data = await eventosService.getEventos();
        console.log("Eventos recibidos:", data);
        setEvents(Array.isArray(data) ? data : []);

        //Datos null/undefined mezclados
        if (Array.isArray(data) && data.length > 0) {
          const categoriasUnicas = [...new Set(
            data
              .map(evento => evento.categoria)
              .filter(categoria => categoria && typeof categoria === 'string')
              .map(categoria => categoria.trim().toLowerCase())
          )];
          
          const modalidadesUnicas = [...new Set(
            data
              .map(evento => evento.modalidad)
              .filter(modalidad => modalidad && typeof modalidad === 'string')
              .map(modalidad => modalidad.trim().toLowerCase())
          )];
          
          setCategorias(categoriasUnicas);
          setModalidades(modalidadesUnicas);
        }

      } catch (error) {
        setEvents([]);
        setCategorias([]);
        setModalidades([]);
      } finally {
        setLoading(false);
        setCategoriasLoading(false);
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
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl font-bold mb-4">Eventos</h1>
            <p className="text-muted-foreground mb-8">
              Descubre conferencias, workshops y meetups diseñados para impulsar tu carrera profesional y conectar con
              expertos de la industria.
            </p>
            {/* ✅ Solo la barra de búsqueda, sin botón de filtros */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Buscar eventos..." 
                  className="pl-10 auth-input" 
                  value={search} 
                  onChange={(e) => setSearch(e.target.value)} 
                />
              </div>
            </div>
          </div>

          {/*Filtros siempre visibles*/}
          <div className="flex gap-8">
            {/* Sidebar de filtros siempre visible */}
            <div className="w-80 flex-shrink-0">
              {categoriasLoading ? (
                <div className="text-center py-4">Cargando filtros...</div>
              ) : (
                <EventFilters
                  openFilter={openFilter}
                  setOpenFilter={setOpenFilter}
                  categoriasSeleccionadas={categoriasSeleccionadas}
                  setCategoriasSeleccionadas={setCategoriasSeleccionadas}
                  modalidad={modalidad}
                  setModalidad={setModalidad}
                  precioSeleccionado={precioSeleccionado}
                  setPrecioSeleccionado={setPrecioSeleccionado}
                  precioMin={precioMin}
                  setPrecioMin={setPrecioMin}
                  precioMax={precioMax}
                  setPrecioMax={setPrecioMax}
                  filters={filters}
                />
              )}
            </div>

            {/* Contenido principal */}
            <div className="flex-1">
              {/* Eventos destacados */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Eventos destacados</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredEvents
                    .slice(0, 4) // Primeros 4 como destacados
                    .map((event) => (
                      <div
                        key={event.id_evento}
                        className="flex flex-col md:flex-row bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="md:w-2/5 relative h-48 md:h-auto">
                          <Image
                            src={event.urlfoto || "/placeholder.svg"}
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
                              <div>
                                <p className="font-medium">{formatFecha(event.fechaInicio)}</p>
                                <p className="text-sm text-muted-foreground">
                                  {formatHora(event.fechaInicio)} - {formatHora(event.fechaFin)}
                                </p>
                              </div>
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
              </div>

              {/* Todos los eventos */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Todos los eventos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id_evento}
                      className="bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <div className="relative h-48">
                        <Image
                          src={event.urlfoto || "/placeholder.svg"}
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
                            <div>
                              <p className="font-medium">
                                {event.fechaInicio
                                  ? new Date(event.fechaInicio).toLocaleDateString() +
                                    " " +
                                    new Date(event.fechaInicio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                  : "Sin fecha"}
                              </p>
                            </div>
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
            </div>
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