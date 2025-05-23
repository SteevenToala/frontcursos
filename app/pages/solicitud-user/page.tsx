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
    <SiteLayout>
      <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-2xl shadow-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-[#7B1416] mb-6 text-center">Formulario de Solicitud de Cambio</h1>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Datos del Solicitante */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#A52527]">Datos del Solicitante</h2>
            <input name="nombre" type="text" placeholder="Nombre completo" onChange={() => { }} className="w-full p-3 border rounded-xl" required />
            <input name="correo" type="email" placeholder="Correo electrónico / Usuario" onChange={() => { }} className="w-full p-3 border rounded-xl" required />
            <input name="rol" type="text" placeholder="Rol" onChange={() => { }} className="w-full p-3 border rounded-xl" required />
          </div>

          {/* Datos de la Aplicación */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#A52527]">Datos de la Aplicación</h2>
            <label className="block font-medium mb-1">Apartado afectado</label>
            <select name="apartado" onChange={handleChangeSolicitud} className="w-full p-3 border rounded-xl">
              <option value="Home">Home</option>
              <option value="Login">Login</option>
              <option value="Eventos">Eventos</option>
            </select>
          </div>

          {/* Descripción del Cambio Solicitado */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#A52527]">Descripción del Cambio Solicitado</h2>
            <div className="space-y-2">
              <label className="block font-medium">Tipo de cambio</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="radio" name="tipoCambio" value="Corrección de error" onChange={handleChangeSolicitud} /> Corrección de error
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="tipoCambio" value="Mejora / Nueva funcionalidad" onChange={handleChangeSolicitud} /> Mejora / Nueva funcionalidad
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="tipoCambio" value="Cambios visuales / UX" onChange={handleChangeSolicitud} /> Cambios visuales / UX
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="tipoCambio" value="Otro" onChange={handleChangeSolicitud} /> Otro (especificar)
                </label>
                <input name="otroTipo" type="text" placeholder="Especificar si eligió 'Otro'" onChange={handleChangeSolicitud} className="w-full p-2 border rounded-lg" />
              </div>
            </div>
            <textarea name="descripcion" placeholder="Descripción detallada del cambio solicitado (incluya ejemplos o pantallazos si es posible)" onChange={handleChangeSolicitud} className="w-full p-3 border rounded-xl min-h-[100px]" />
          </div>
          {/* Campos de error si aplica */}
          {solicitudData.tipoCambio === "Corrección de error" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-[#A52527]">Detalles del Error</h2>

              <div className="space-y-2">
                <label className="block font-medium">Pasos para reproducir el error</label>
                <textarea
                  name="pasosReproduccion"
                  placeholder="Describe paso a paso cómo ocurre el error"
                  onChange={handleChangeDetalle}
                  className="w-full p-3 border rounded-xl min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Resultado esperado</label>
                  <input
                    name="resultadoEsperado"
                    type="text"
                    placeholder="¿Qué debería ocurrir?"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium">Resultado observado</label>
                  <input
                    name="resultadoObservado"
                    type="text"
                    placeholder="¿Qué ocurrió en realidad?"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Fecha y hora del incidente</label>
                  <input
                    name="fechaIncidente"
                    type="datetime-local"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium">Frecuencia del error</label>
                  <select
                    name="frecuenciaError"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-xl"
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
                <label className="block font-medium">Mensaje de error (si aparece alguno)</label>
                <textarea
                  name="mensajeError"
                  placeholder="Texto del error mostrado en pantalla o consola"
                  onChange={handleChangeDetalle}
                  className="w-full p-3 border rounded-xl min-h-[80px]"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium">Sistema operativo / navegador</label>
                  <input
                    name="sistemaNavegador"
                    type="text"
                    placeholder="Ej: Windows 11, Chrome 124"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-medium">Ruta o URL donde ocurre</label>
                  <input
                    name="urlError"
                    type="text"
                    placeholder="Ej: /login, /dashboard/eventos"
                    onChange={handleChangeDetalle}
                    className="w-full p-3 border rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block font-medium">¿Hay solución temporal o workaround?</label>
                <textarea
                  name="workaround"
                  placeholder="Describe si existe alguna forma de evitar el error temporalmente"
                  onChange={handleChangeDetalle}
                  className="w-full p-3 border rounded-xl min-h-[80px]"
                />
              </div>
            </div>
          )}
          {/* Justificación del Cambio */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#A52527]">Justificación del Cambio</h2>
            <textarea name="justificacion" placeholder="¿Por qué se necesita este cambio? ¿Qué problema resuelve o qué mejora aporta?" onChange={handleChangeSolicitud} className="w-full p-3 border rounded-xl min-h-[100px]" />
          </div>
          {/* Urgencia */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#A52527]">Urgencia del Cambio</h2>
            <select name="urgencia" onChange={handleChangeSolicitud} className="w-full p-3 border rounded-xl">
              <option value="Alta">Alta (bloquea operaciones / afecta a muchos usuarios)</option>
              <option value="Media">Media (impacto moderado / solución alternativa posible)</option>
              <option value="Baja">Baja (mejora menor / no urgente)</option>
            </select>
          </div>
          {/* Adjuntar Archivos */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-[#A52527]">Adjuntar Archivos</h2>

            <div className="flex flex-col items-start space-y-2">
              <label
                htmlFor="archivoInput"
                className="inline-block bg-[#7B1416] text-white px-6 py-2 rounded-lg shadow hover:bg-[#5e0e10] cursor-pointer transition duration-200"
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


          <button type="submit" className="w-full py-3 bg-[#7B1416] text-white font-semibold rounded-2xl hover:bg-[#5e0e10] transition">Enviar Solicitud</button>
        </form>
      </div>
    </SiteLayout>
  );
}