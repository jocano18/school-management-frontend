import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Alumno } from "../../domain/models/Alumno.ts";

interface Props {
    alumno: Alumno | null;
    onClose: () => void;
    onSave: (data: Alumno) => void;
}

export const AlumnoModal = ({ alumno, onClose, onSave }: Props) => {
    const [formData, setFormData] = useState<Alumno>({
        nombre: '',
        apellido: '',
        email: '',
        fechaNacimiento: ''
    });

    // Si el componente recibe un alumno (Editar), llenamos el formulario
    useEffect(() => {
        if (alumno) {
            setFormData(alumno);
        }
    }, [alumno]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-end z-50">
            <div className="bg-white w-full max-w-md h-full p-8 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-semibold text-slate-800">
                        {alumno ? 'Editar Alumno' : 'Nuevo Alumno'}
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nombre</label>
                        <input
                            type="text"
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm font-normal text-slate-600"
                            value={formData.nombre}
                            onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Apellido</label>
                        <input
                            type="text"
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm font-normal text-slate-600"
                            value={formData.apellido}
                            onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</label>
                        <input
                            type="email"
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm font-normal text-slate-600"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm font-normal text-slate-500"
                            value={formData.fechaNacimiento}
                            onChange={(e) => setFormData({...formData, fechaNacimiento: e.target.value})}
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-auto w-full bg-[#2EC4D6] text-white py-4 rounded-2xl font-bold text-[11px] tracking-widest uppercase shadow-lg shadow-cyan-100 active:scale-[0.98] transition-all"
                    >
                        {alumno ? 'Actualizar Datos' : 'Registrar Alumno'}
                    </button>
                </form>
            </div>
        </div>
    );
};