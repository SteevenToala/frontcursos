'use client'
import '@/app/globals.css'
import { Curso } from '@/app/models/Curso'
import { calificarEstudiante } from '@/app/Services/eventoService'
import { getEventos } from '@/app/Services/reporteService'
import { obtenerListaUsuarios } from '@/app/Services/usuarioService'
import React, { useState, useEffect } from 'react'



export default function Calificacion() {
    const [cursoSeleccionado, setCursoSeleccionado] = useState<number | null>(null)
    const [calificaciones, setCalificaciones] = useState<{ [id: string]: { nota: string; asistencia: string } }>({})
    const [cursos, setCursos] = useState<Curso[]>([])
    const [estudiantes, setEstudiantes] = useState<{ id: number, nombre: string }[]>([])
    useEffect(() => {
        const fetchCursos = async () => {
            try {
                const data = await getEventos();
                setCursos(data);
            } catch (error) {
                console.error("Error al cargar cursos:", error);
            }
        };

        fetchCursos();
    }, []);
    useEffect(() => {
        const fecthEstudiantes = async () => {
            if (cursoSeleccionado !== null) {
                const userss = await obtenerListaUsuarios(cursoSeleccionado);
                console.log(userss)
                setEstudiantes(userss)
            } else {
                setEstudiantes([])
            }
            setCalificaciones({})
        }
        fecthEstudiantes();
    }, [cursoSeleccionado])

    const handleInputChange = (estudianteId: number, campo: 'nota' | 'asistencia', valor: string) => {
        setCalificaciones(prev => ({
            ...prev,
            [estudianteId]: {
                ...prev[estudianteId],
                [campo]: valor,
            },
        }))
    }

    const handleGuardar = async (id: number) => {
        await calificarEstudiante({
            asistencia: Number(calificaciones[id].asistencia),
            nota: Number(calificaciones[id].nota),
            idInscripcion: id
        });
    }

    return (
        <div className="p-6 bg-white rounded-md shadow-sm">
            <h1 className="text-2xl font-bold text-red-700 mb-6">Calificar Estudiantes</h1>

            <div className="mb-6">
                <label className="block mb-2 text-gray-800 font-medium">Selecciona un curso:</label>
                <select
                    className="border border-gray-300 p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-300"
                    onChange={(e) => setCursoSeleccionado(Number(e.target.value))}
                >
                    <option value="">-- Selecciona --</option>
                    {cursos.map(curso => (
                        <option key={curso.id_evento} value={curso.id_evento}>{curso.nombre}</option>
                    ))}
                </select>
            </div>

            {estudiantes.length > 0 && (
                <div className="space-y-6">
                    <h2 className="text-xl font-semibold text-gray-800">Estudiantes inscritos</h2>

                    {estudiantes.map(estudiante => (
                        <div key={estudiante.id} className="p-4 bg-red-50 border border-red-200 rounded-md shadow-sm">
                            <p className="font-medium text-red-700">{estudiante.nombre}</p>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="number"
                                    placeholder="Nota total"
                                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                                    value={calificaciones[estudiante.id]?.nota || ''}
                                    onChange={(e) => handleInputChange(estudiante.id, 'nota', e.target.value)}
                                />
                                <input
                                    type="number"
                                    placeholder="Asistencia (%)"
                                    className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-300"
                                    value={calificaciones[estudiante.id]?.asistencia || ''}
                                    onChange={(e) => handleInputChange(estudiante.id, 'asistencia', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}

                    <button
                        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-2 rounded-md shadow"
                        onClick={() => {
                            estudiantes.forEach(estudiante => {
                                if (
                                    calificaciones[estudiante.id]?.nota &&
                                    calificaciones[estudiante.id]?.asistencia
                                ) {
                                    handleGuardar(estudiante.id)
                                }
                            })
                        }}
                    >
                        Guardar Calificaciones
                    </button>
                </div>
            )}
        </div>
    )
}
