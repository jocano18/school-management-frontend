import { useState } from 'react';
import { X } from 'lucide-react';
import type { Materia } from "../../domain/models/Materia.ts";

interface Props {
    materia: Materia | null;
    onClose: () => void;
    onSave: (data: Materia) => void;
}

export const MateriaModal = ({ materia, onClose, onSave }: Props) => {
    // Inicializamos el estado U
    const [formData, setFormData] = useState<Materia>({
        nombre: materia?.nombre || '',
        codigo: materia?.codigo || '',
        creditos: materia?.creditos || 0
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSave({ ...materia, ...formData });
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-end z-50">
            <div className="bg-white w-full max-w-md h-full p-8 shadow-2xl flex flex-col">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-semibold text-slate-800">
                        {materia ? 'Editar Materia' : 'Nueva Materia'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Código</label>
                        <input
                            type="text"
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm"
                            value={formData.codigo}
                            onChange={e => setFormData({...formData, codigo: e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombre</label>
                        <input
                            type="text"
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm"
                            value={formData.nombre}
                            onChange={e => setFormData({...formData, nombre: e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Créditos</label>
                        <input
                            type="number"
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm"
                            value={formData.creditos}
                            onChange={e => setFormData({...formData, creditos: Number(e.target.value)})}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-auto w-full bg-[#6C63FF] text-white py-4 rounded-2xl font-bold text-[11px] tracking-widest uppercase shadow-lg active:scale-95 transition-all"
                    >
                        {materia ? 'Actualizar Materia' : 'Guardar Materia'}
                    </button>
                </form>
            </div>
        </div>
    );
};