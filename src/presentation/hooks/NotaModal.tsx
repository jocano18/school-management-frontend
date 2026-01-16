import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { AlumnoService } from "../../domain/services/AlumnoService";
import { MateriaService } from "../../domain/services/MateriaService";
import type {Alumno} from "../../domain/models/Alumno";
import type {Materia} from "../../domain/models/Materia";
import type { NotaRequest } from "../../domain/models/Nota";

interface Props {
    onClose: () => void;
    onSave: (data: NotaRequest) => Promise<void>;
}

export const NotaModal = ({ onClose, onSave }: Props) => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [materias, setMaterias] = useState<Materia[]>([]);
    const [formData, setFormData] = useState({ alumnoId: 0, materiaId: 0, valor: 0 });

    useEffect(() => {
        // Cargamos los datos necesarios para los Selects
        const loadData = async () => {
            const [a, m] = await Promise.all([AlumnoService.getAll(), MateriaService.getAll()]);
            setAlumnos(a);
            setMaterias(m);
        };
        loadData();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.alumnoId === 0 || formData.materiaId === 0) return alert("Selecciona alumno y materia");
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex justify-end z-50">
            <div className="bg-white w-full max-w-md h-full p-8 shadow-2xl flex flex-col">
                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-xl font-semibold text-slate-800">Cargar Calificación</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-8">
                    {/* SELECT ALUMNO */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seleccionar Alumno</label>
                        <select
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm bg-transparent"
                            onChange={e => setFormData({...formData, alumnoId: Number(e.target.value)})}
                        >
                            <option value="">Elegir un alumno...</option>
                            {alumnos.map(a => <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>)}
                        </select>
                    </div>

                    {/* SELECT MATERIA */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Materia</label>
                        <select
                            required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm bg-transparent"
                            onChange={e => setFormData({...formData, materiaId: Number(e.target.value)})}
                        >
                            <option value="">Elegir materia...</option>
                            {materias.map(m => <option key={m.id} value={m.id}>{m.nombre}</option>)}
                        </select>
                    </div>

                    {/* INPUT NOTA */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calificación (0 - 10)</label>
                        <input
                            type="number" step="0.1" min="0" max="10" required
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm"
                            onChange={e => setFormData({...formData, valor: Number(e.target.value)})}
                        />
                    </div>

                    <button type="submit" className="mt-auto w-full bg-[#FF8A3D] text-white py-4 rounded-2xl font-bold uppercase shadow-lg shadow-cyan-100">
                        Guardar Nota
                    </button>
                </form>
            </div>
        </div>
    );
};