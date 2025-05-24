'use client';
import React, { useState } from 'react';
import '@/app/globals.css';
import { SiteLayout } from '@/components/site-layout';
import CreateSolicitude from '@/app/models/Solicitud';
import Solicitud from '@/app/Services/solicitudService';
import CreateDetalleError from '@/app/models/DetalleError';
import FirebaseService from '@/app/Services/firebase/FirebaseService';

export default function SolicitudCambioForm() {
  const [archivoFile, setArchivoFile] = useState<File | null>(null);
  const handleArchivoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setArchivoFile(file);
    }
  };


  const [solicitudData, setSolicitudData] = useState<CreateSolicitude>({
    idUser: 'Du3rYSwCxFhvZPUHkLZRM78rL2L2',
    apartado: '',
    tipoCambio: '',
    otroTipo: '',
    descripcion: '',
    justificacion: '',
    urgencia: '',
    archivo: '',
  });

  const [detalleErrorData, setDetalleErrorData] = useState<CreateDetalleError>({
    idSolicitud: 0,
    pasosReproduccion: '',
    resultadoEsperado: '',
    resultadoObservado: '',
    fechaIncidente: new Date(),
    frecuenciaError: '',
    mensajeError: '',
    sistemaNavegador: '',
    urlError: '',
    workaround: '',
  });

  const handleChangeSolicitud = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const files = (e.target as HTMLInputElement).files;

    if (type === 'file' && files && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setSolicitudData((prev) => ({
          ...prev,
          [name]: reader.result as string,
        }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setSolicitudData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChangeDetalle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setDetalleErrorData((prev) => ({
      ...prev,
      [name]: type === "datetime-local" ? new Date(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let urlArchivo;
      if (archivoFile) {
        urlArchivo = await FirebaseService.uploadFile(archivoFile, "alexander", archivoFile.name);
      }
      solicitudData.archivo = urlArchivo ?? "";
      const solicitudCreada = await Solicitud.crearSolicitud(solicitudData);

      if (solicitudData.tipoCambio === 'Corrección de error') {
        await Solicitud.crearDetalleError({
          ...detalleErrorData,
          idSolicitud: solicitudCreada.idSolicitud,
        });
      }

      alert('Solicitud enviada correctamente');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <SiteLayout>      <div className="max-w-4xl mx-auto p-6 bg-card rounded-2xl shadow-md border">
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Formulario de Solicitud de Cambio</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Datos del Solicitante */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Datos del Solicitante</h2>
            <input name="nombre" type="text" placeholder="Nombre completo" onChange={() => { }} className="w-full p-3 border rounded-lg bg-background auth-input" required />            <input name="correo" type="email" placeholder="Correo electrónico / Usuario" onChange={() => { }} className="w-full p-3 border rounded-lg bg-background auth-input" required />
            <input name="rol" type="text" placeholder="Rol" onChange={() => { }} className="w-full p-3 border rounded-lg bg-background auth-input" required />
          </div>

          {/* Datos de la Aplicación */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Datos de la Aplicación</h2>
            <label className="block text-sm font-medium mb-2 text-foreground">Apartado afectado</label>
            <select name="apartado" onChange={handleChangeSolicitud} className="w-full p-3 border rounded-lg bg-background auth-input">
              <option value="Home">Home</option>
              <option value="Login">Login</option>
              <option value="Eventos">Eventos</option>
            </select>
          </div>          {/* Descripción del Cambio Solicitado */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Descripción del Cambio Solicitado</h2>
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-2 text-foreground">Tipo de cambio</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="tipoCambio" value="Corrección de error" onChange={handleChangeSolicitud} className="text-primary focus:ring-primary" /> Corrección de error
                </label>                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="tipoCambio" value="Mejora / Nueva funcionalidad" onChange={handleChangeSolicitud} className="text-primary focus:ring-primary" /> Mejora / Nueva funcionalidad
                </label>
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="tipoCambio" value="Cambios visuales / UX" onChange={handleChangeSolicitud} className="text-primary focus:ring-primary" /> Cambios visuales / UX
                </label>
                <label className="flex items-center gap-2 text-foreground">
                  <input type="radio" name="tipoCambio" value="Otro" onChange={handleChangeSolicitud} className="text-primary focus:ring-primary" /> Otro (especificar)
                </label>
                <input name="otroTipo" type="text" placeholder="Especificar si eligió 'Otro'" onChange={handleChangeSolicitud} className="w-full p-3 border rounded-lg bg-background auth-input" />              </div>
            </div>
            <textarea name="descripcion" placeholder="Descripción detallada del cambio solicitado (incluya ejemplos o pantallazos si es posible)" onChange={handleChangeSolicitud} className="w-full p-3 border rounded-lg bg-background auth-input min-h-[120px]" />
          </div>
          {/* Campos de error si aplica */}
          {solicitudData.tipoCambio === "Corrección de error" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-primary">Detalles del Error</h2>              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2 text-foreground">Pasos para reproducir el error</label>
                <textarea
                  name="pasosReproduccion"
                  placeholder="Describe paso a paso cómo ocurre el error"
                  onChange={handleChangeDetalle}
                  className="w-full p-3 border rounded-lg bg-background auth-input min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Resultado esperado</label>
                  <input
                    name="resultadoEsperado"
                    type="text"
                    placeholder="¿Qué debería ocurrir?"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-lg bg-background auth-input"
                  />                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Resultado observado</label>
                  <input
                    name="resultadoObservado"
                    type="text"
                    placeholder="¿Qué ocurrió en realidad?"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-lg bg-background auth-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Fecha y hora del incidente</label>
                  <input
                    name="fechaIncidente"
                    type="datetime-local"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-lg bg-background auth-input"
                  />                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Frecuencia del error</label>
                  <select
                    name="frecuenciaError"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-lg bg-background auth-input"
                  >
                    <option value="">Seleccione</option>
                    <option value="Siempre">Siempre ocurre</option>
                    <option value="Intermitente">Ocurre a veces</option>
                    <option value="Unica vez">Ocurrió una sola vez</option>
                    <option value="No recurrente">No se ha vuelto a presentar</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2 text-foreground">Mensaje de error (si aparece alguno)</label>
                <textarea
                  name="mensajeError"
                  placeholder="Texto del error mostrado en pantalla o consola"
                  onChange={handleChangeDetalle}
                  className="w-full p-3 border rounded-lg bg-background auth-input min-h-[80px]"
                />              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Sistema operativo / navegador</label>
                  <input
                    name="sistemaNavegador"
                    type="text"
                    placeholder="Ej: Windows 11, Chrome 124"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-lg bg-background auth-input"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-foreground">Ruta o URL donde ocurre</label>
                  <input
                    name="urlError"
                    type="text"
                    placeholder="Ej: /login, /dashboard/eventos"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-lg bg-background auth-input"
                  />
                </div>
              </div>              <div className="space-y-2">
                <label className="block text-sm font-medium mb-2 text-foreground">¿Hay solución temporal o workaround?</label>
                <textarea
                  name="workaround"
                  placeholder="Describe si existe alguna forma de evitar el error temporalmente"
                  onChange={handleChangeDetalle}
                  className="w-full p-3 border rounded-lg bg-background auth-input min-h-[80px]"
                />
              </div>
            </div>
          )}
          {/* Justificación del Cambio */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Justificación del Cambio</h2>
            <textarea 
              name="justificacion" 
              placeholder="¿Por qué se necesita este cambio? ¿Qué problema resuelve o qué mejora aporta?" 
              onChange={handleChangeSolicitud} 
              className="w-full p-3 border rounded-lg bg-background auth-input min-h-[120px]" 
            />          </div>
          {/* Urgencia */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Urgencia del Cambio</h2>
            <select name="urgencia" onChange={handleChangeSolicitud} className="w-full p-3 border rounded-lg bg-background auth-input">
              <option value="Alta">Alta (bloquea operaciones / afecta a muchos usuarios)</option>
              <option value="Media">Media (impacto moderado / solución alternativa posible)</option>
              <option value="Baja">Baja (mejora menor / no urgente)</option>
            </select>
          </div>
          {/* Adjuntar Archivos */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Adjuntar Archivos</h2>

            <div className="flex flex-col items-start space-y-2">              <label
                htmlFor="archivoInput"
                className="inline-flex items-center justify-center px-6 py-2 auth-button text-white font-medium rounded-lg cursor-pointer transition-all"
              >
                Seleccionar archivo
              </label>

              <input
                id="archivoInput"
                type="file"
                accept=".png,.jpg,.jpeg,.pdf,.docx,.xlsx"
                onChange={handleArchivoChange}
                className="hidden"
              />

              {archivoFile && (
                <p className="text-sm text-gray-700">
                  Archivo seleccionado: <span className="font-medium text-gray-900">{archivoFile.name}</span>
                </p>
              )}
            </div>
          </div>


          <button 
            type="submit" 
            className="w-full py-3 auth-button text-white font-semibold rounded-lg transition-all"
          >
            Enviar Solicitud
          </button>
        </form>
      </div>
    </SiteLayout>
  );
}