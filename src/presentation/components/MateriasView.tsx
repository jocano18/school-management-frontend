import { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Materia } from "../../domain/models/Materia";
import { MateriaService } from "../../domain/services/MateriaService";
import { MateriaModal } from "../hooks/MateriaModal";

export const MateriasView = () => {
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [loading, setLoading] = useState(true);

    // Estados para controlar el Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMateria, setSelectedMateria] = useState<Materia | null>(null);

    const fetchMaterias = async () => {
        try {
            setLoading(true);
            const data = await MateriaService.getAll();
            setMaterias(data);
        } catch (error) {
            console.error("Error al cargar materias:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMaterias();
    }, []);

    const handleDelete = async (id: number) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta materia?")) {
            try {
                await MateriaService.delete(id);
                fetchMaterias();
            } catch (error) {
                console.error("Error al eliminar:", error);
            }
        }
    };

    const handleSave = async (materiaData: Materia) => {
        try {
            if (selectedMateria?.id) {
                // Si tiene ID, actualizamos (PUT)
                await MateriaService.update(selectedMateria.id, materiaData);
            } else {
                // Si no, creamos (POST)
                await MateriaService.create(materiaData);
            }
            setIsModalOpen(false);
            fetchMaterias();
        } catch (error) {
            console.error("Error al guardar materia:", error);
        }
    };

    return (
        <div className="bg-white p-10 mx-auto w-full animate-in zoom-in-95 duration-500">

            <header className="mb-10 flex justify-between items-start">
                <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-bold text-slate-800 tracking-tight">Gestión de Materias</h2>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Administra el catálogo de asignaturas, códigos y créditos
                    </p>
                </div>

                <button
                    onClick={() => { setSelectedMateria(null); setIsModalOpen(true); }}
                    className="bg-[#6C63FF] hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-100">

                    + Nueva Materia
                </button>
            </header>

            {loading ? (
                <div className="py-20 flex flex-col items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2EC4D6]"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                        <tr className="text-slate-400 border-b border-gray-100 uppercase text-[10px] tracking-widest">
                            <th className="pb-4 font-bold">Código</th>
                            <th className="pb-4 font-bold">Nombre</th>
                            <th className="pb-4 font-bold">Créditos</th>
                            <th className="pb-4 font-bold text-center">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                        {materias.map((m) => (
                            <tr key={m.id} className="group hover:bg-slate-50/50 transition-colors">
                                <td className="py-5 text-sm font-bold text-slate-700">{m.codigo}</td>
                                <td className="py-5 text-sm text-slate-600 font-medium">{m.nombre}</td>
                                <td className="py-5 text-sm text-slate-500">
                                        <span className="bg-slate-100 px-3 py-1 rounded-full text-[11px] font-bold text-slate-500">
                                            {m.creditos}
                                        </span>
                                </td>
                                <td className="py-4 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => { setSelectedMateria(m); setIsModalOpen(true); }}
                                            className="text-slate-400 hover:text-[#6C63FF] transition-colors"
                                            title="Editar"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <span className="text-gray-200 font-light">|</span>
                                        <button
                                            onClick={() => handleDelete(m.id!)}
                                            className="text-slate-400 hover:text-red-500 transition-colors"
                                            title="Eliminar"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal de Materia */}
            {isModalOpen && (
                <MateriaModal
                    materia={selectedMateria}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </div>
    );
};