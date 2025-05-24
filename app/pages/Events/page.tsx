import Link from "next/link"
import Image from "next/image"
import { SiteLayout } from "@/components/site-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EventsPage() {
  // Datos de ejemplo para eventos
  const events = [
    {
      id: 1,
      title: "Conferencia de Desarrollo Web 2023",
      description:
        "Únete a los mejores desarrolladores web para aprender las últimas tendencias y tecnologías en desarrollo frontend y backend.",
      date: "15 de Junio, 2023",
      time: "10:00 - 18:00",
      location: "Madrid, España",
      venue: "Centro de Convenciones Madrid",
      image: "/placeholder.svg?height=300&width=600",
      price: "Desde 99€",
      category: "Desarrollo",
      attendees: 250,
      featured: true,
    },
    {
      id: 2,
      title: "Workshop de UX/UI Design",
      description:
        "Un taller práctico donde aprenderás metodologías y herramientas para mejorar la experiencia de usuario en tus proyectos.",
      date: "22 de Junio, 2023",
      time: "09:30 - 17:00",
      location: "Barcelona, España",
      venue: "Design Hub Barcelona",
      image: "/placeholder.svg?height=300&width=600",
      price: "149€",
      category: "Diseño",
      attendees: 50,
      featured: true,
    },
    {
      id: 3,
      title: "Masterclass de Marketing Digital",
      description:
        "Aprende estrategias avanzadas de marketing digital con expertos del sector. SEO, SEM, redes sociales y más.",
      date: "30 de Junio, 2023",
      time: "16:00 - 20:00",
      location: "Valencia, España",
      venue: "Hotel Sorolla Palace",
      image: "/placeholder.svg?height=300&width=600",
      price: "79€",
      category: "Marketing",
      attendees: 100,
      featured: false,
    },
    {
      id: 4,
      title: "Hackathon: Inteligencia Artificial",
      description:
        "48 horas para desarrollar soluciones innovadoras utilizando inteligencia artificial. Premios para los mejores proyectos.",
      date: "8-10 de Julio, 2023",
      time: "Comienza a las 18:00",
      location: "Sevilla, España",
      venue: "Campus Tecnológico",
      image: "/placeholder.svg?height=300&width=600",
      price: "Gratuito",
      category: "Desarrollo",
      attendees: 150,
      featured: false,
    },
    {
      id: 5,
      title: "Conferencia de Emprendimiento",
      description:
        "Descubre las claves para lanzar tu startup y hacerla crecer. Networking con inversores y emprendedores de éxito.",
      date: "15 de Julio, 2023",
      time: "09:00 - 19:00",
      location: "Málaga, España",
      venue: "Palacio de Ferias",
      image: "/placeholder.svg?height=300&width=600",
      price: "129€",
      category: "Negocios",
      attendees: 300,
      featured: true,
    },
    {
      id: 6,
      title: "Workshop de Data Science",
      description:
        "Taller práctico sobre análisis de datos, machine learning y visualización. Trae tu portátil para practicar.",
      date: "22 de Julio, 2023",
      time: "10:00 - 18:00",
      location: "Bilbao, España",
      venue: "Universidad de Deusto",
      image: "/placeholder.svg?height=300&width=600",
      price: "199€",
      category: "Data",
      attendees: 40,
      featured: false,
    },
  ]

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
                  key={event.id}
                  className="flex flex-col md:flex-row bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="md:w-2/5 relative h-60 md:h-auto">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                    <Badge className="absolute top-4 left-4 bg-primary">{event.category}</Badge>
                  </div>
                  <div className="md:w-3/5 p-6">
                    <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{event.description}</p>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span className="text-sm">
                          {event.venue}, {event.location}
                        </span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        <span className="text-sm">{event.attendees} asistentes</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary">{event.price}</span>
                      <Button asChild className="auth-button">
                        <Link href={`/events/${event.id}`}>Ver detalles</Link>
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
                key={event.id}
                className="bg-white rounded-lg border border-primary/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-48">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <Badge className="absolute top-4 left-4 bg-primary">{event.category}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-2">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.date}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{event.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">{event.price}</span>
                    <Button asChild className="auth-button">
                      <Link href={`/events/${event.id}`}>Ver detalles</Link>
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