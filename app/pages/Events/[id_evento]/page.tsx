"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import * as eventosService from "../../../Services/eventosService";
import { SiteLayout } from "@/components/site-layout";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import '../../../globals.css'

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

  return (
    <SiteLayout>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="relative h-64 w-full mb-6">
              <Image
                src={evento.urlfoto || "/placeholder.svg"}
                alt={evento.nombre}
                fill
                className="object-cover rounded"
              />
              <Badge className="absolute top-4 left-4 bg-primary">{evento.categoria}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{evento.nombre}</h1>
            <p className="text-muted-foreground mb-4">{evento.descripcion}</p>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{evento.fechaInicio} - {evento.fechaFin}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{evento.modalidad}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Organizador #{evento.id_organizador}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-primary text-xl">{evento.costo ? `$${evento.costo}` : "Gratis"}</span>
              <Button asChild>
                <a href="/events">Volver a eventos</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
