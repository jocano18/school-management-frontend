import { useEffect, useState } from 'react';
import type { Alumno } from "../../domain/models/Alumno";
import type { Nota, NotaRequest } from "../../domain/models/Nota";
import { AlumnoService } from "../../domain/services/AlumnoService";
import { NotaService } from "../../domain/services/NotaService";
import { NotaModal } from "../hooks/NotaModal";

export const NotasView = () => {
    const [alumnos, setAlumnos] = useState<Alumno[]>([]);
    const [selectedAlumnoId, setSelectedAlumnoId] = useState<number | "">("");
    const [notas, setNotas] = useState<Nota[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        AlumnoService.getAll()
            .then(setAlumnos)
            .catch(err => console.error("Error cargando alumnos", err));
    }, []);


    useEffect(() => {

        if (!selectedAlumnoId) return;

        let active = true;

        const fetchNotas = async () => {
            try {
                const data = await NotaService.getAllByAlumno(Number(selectedAlumnoId));
                if (active) setNotas(data);
            } catch (error) {
                console.error("Error", error);
                if (active) setNotas([]);
            }
        };

        fetchNotas();
        return () => { active = false; };
    }, [selectedAlumnoId]);

    const notasAMostrar = selectedAlumnoId ? notas : [];

    const handleSaveNota = async (data: NotaRequest) => {
        try {
            await NotaService.create(data);
            setIsModalOpen(false);
            if (selectedAlumnoId === data.alumnoId) {
                const updated = await NotaService.getAllByAlumno(data.alumnoId);
                setNotas(updated);
            }
        } catch (error) {
            console.error("Error al guardar nota:", error);
        }
    };

    return (
        <div className="bg-white p-10 mx-auto w-full animate-in fade-in duration-500 ">
            <header className="mb-10 flex justify-between items-end">
                <div className="flex flex-col gap-4 w-1/3">
                    <h2 className="text-2xl font-bold text-slate-800">Consulta de Notas</h2>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Seleccionar Alumno</label>
                        <select
                            className="border-b border-slate-200 py-2 outline-none focus:border-[#2EC4D6] text-sm bg-transparent"
                            value={selectedAlumnoId}
                            onChange={(e) => {
                                const val = e.target.value ? Number(e.target.value) : "";
                                setSelectedAlumnoId(val);
                                // Opcional: limpiar el estado al cambiar para evitar ver notas viejas un milisegundo
                                if (val === "") setNotas([]);
                            }}
                        >
                            <option value="">-- Elige un estudiante --</option>
                            {alumnos.map(a => (
                                <option key={a.id} value={a.id}>{a.nombre} {a.apellido}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#FF8A3D] text-white px-6 py-3 rounded-2xl font-bold text-xs shadow-lg active:scale-95 transition-all"
                >
                    + Registrar Nueva Nota
                </button>
            </header>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-[10px]">
                    <thead>
                    <tr className="text-slate-400 border-b border-gray-100 uppercase text-[10px] tracking-widest">
                        <th className="pb-4 font-bold">Materia (Asignatura)</th>
                        <th className="pb-4 font-bold text-center">Calificación</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                    {notasAMostrar.length > 0 ? (
                        notasAMostrar.map((n, index) => (
                            <tr key={n.id || index} className="hover:bg-slate-50/50 transition-colors">
                                <td className="py-5 text-sm text-slate-600 font-medium">{n.nombreMateria}</td>
                                <td className="py-5 text-center">
                                    <span className={`px-3 py-1 rounded-lg font-bold text-xs ${n.valor >= 3 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        {n.valor.toFixed(1)}
                                    </span>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2} className="py-10 text-center text-slate-300 text-xs italic">
                                {selectedAlumnoId ? "El alumno no tiene notas registradas" : "Selecciona un alumno para ver sus notas"}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <NotaModal onClose={() => setIsModalOpen(false)} onSave={handleSaveNota} />
            )}
        </div>
    );
};