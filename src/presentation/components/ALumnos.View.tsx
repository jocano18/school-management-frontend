import { useEffect, useState } from 'react';
import type { Alumno } from "../../domain/models/Alumno.ts";
import { AlumnoService } from "../../domain/services/AlumnoService.ts";
import { Pencil, Trash2 } from 'lucide-react';
import {AlumnoModal} from "../hooks/AlumnoModal.tsx";

export const AlumnosView = () => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [loading, setLoading] = useState(true);

    // ESTADOS
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);

    const fetchAlumnos = async () => {
        try {
            setLoading(true);
            const data = await AlumnoService.getAll();
            setAlumnos(data);
        } catch (error) {
            console.error("Error al cargar alumnos:", error);
        } finally {
            setLoading(false);
        }
    };

    // FUNCIÓN ELIMINAR
    const handleDelete = async (id: number) => {
        if (window.confirm("¿Deseas eliminar este registro?")) {
            await AlumnoService.delete(id);
            fetchAlumnos();
        }
    };

    // FUNCIÓN GUARDAR (Lógica de Arquitectura: Service decide POST o PUT)
    const handleSave = async (data: Alumno) => {
        try {
            if (selectedAlumno?.id) {
                await AlumnoService.update(selectedAlumno.id, data);
            } else {
                await AlumnoService.create(data);
            }
            setIsModalOpen(false);
            fetchAlumnos();
        } catch (error) {
            console.error("Error al guardar:", error);
        }
    };

    useEffect(() => { fetchAlumnos(); }, []);

    return (
        <div className="bg-white p-10 mx-auto w-full animate-in zoom-in-95 duration-500">
            <header className="mb-10 flex justify-between items-start">
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold text-slate-800 tracking-tight">Gestión de Alumnos</h2>
                    <p className="text-xs text-slate-400 font-medium">Visualiza y administra los alumnos</p>
                </div>
                <button
                    onClick={() => { setSelectedAlumno(null); setIsModalOpen(true); }}
                    className="bg-[#2EC4D6] hover:bg-cyan-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-100">
                    + Nuevo Alumno
                </button>
            </header>

            {loading ? (
                <div className="py-20 flex flex-col items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2EC4D6]"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="text-slate-400 border-b border-gray-100">
                            <th className="pb-4 font-bold text-[10px] uppercase tracking-widest">Nombre</th>
                            <th className="pb-4 font-bold text-[10px] uppercase tracking-widest">Apellido</th>
                            <th className="pb-4 font-bold text-[10px] uppercase tracking-widest">Nacimiento</th>
                            <th className="pb-4 font-bold text-[10px] uppercase tracking-widest">Email</th>
                            <th className="pb-4 font-bold text-[10px] uppercase tracking-widest text-center">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {alumnos.map((alumno) => (
                            <tr key={alumno.id} className="group hover:bg-slate-50/50">

                                <td className="py-4 text-sm font-normal text-slate-600">{alumno.nombre}</td>
                                <td className="py-4 text-sm font-normal text-slate-600">{alumno.apellido}</td>
                                <td className="py-4 text-sm text-slate-500">
                                    {alumno.fechaNacimiento ? alumno.fechaNacimiento.split('-').reverse().join('-') : '-'}
                                </td>
                                <td className="py-4 text-sm text-slate-500">{alumno.email}</td>
                                <td className="py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => { setSelectedAlumno(alumno); setIsModalOpen(true); }}
                                            className="text-slate-400 hover:text-[#2EC4D6]"><Pencil size={16} />
                                        </button>
                                        <span className="text-gray-200">|</span>
                                        <button
                                            onClick={() => handleDelete(alumno.id!)}
                                            className="text-slate-400 hover:text-red-500"><Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL INTEGRADO */}
            {isModalOpen && (
                <AlumnoModal
                    alumno={selectedAlumno}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};