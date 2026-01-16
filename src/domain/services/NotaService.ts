import api from "../../infrastructure/api/axiosConfig";
import type { Nota, NotaRequest } from "../models/Nota";

export const NotaService = {
    getAllByAlumno: async (id: number): Promise<Nota[]> => {
        const response = await api.get<Nota[]>(`notas/alumno/${id}`);
        return response.data;
    },

    create: async (nota: NotaRequest): Promise<Nota> => {

        const response = await api.post<Nota>('/notas', null, {
            params: {
                alumnoId: nota.alumnoId,
                materiaId: nota.materiaId,
                valor: nota.valor
            }
        });
        return response.data;
    }
};