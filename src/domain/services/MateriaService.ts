import api from "../../infrastructure/api/axiosConfig";
import type {Materia} from "../models/Materia";


export const MateriaService = {

    getAll: async () =>{
        const response = await api.get<Materia[]>('/materias');
        return response.data;

    },

    getById : async (id : number) =>{
        const response = await api.get<Materia>(`/materias/${id}`);
        return response.data;
    },

    create: async(materia: Materia) =>{
        const response = await api.post<Materia>('/materias', materia);
        return response.data;
    },

    update : async(id: number, materia : Materia) =>{
        const response = await api.put<Materia>(`/materias/${id}`, materia);
        return response.data;

    },

    updatePatch : async (id: number, datosParciales:Partial<Materia>) =>{
        const response = await api.patch<Materia>(`/materias/${id}`, datosParciales);
        return response.data;
    },

    delete : async (id:number)=> {
        await  api.delete(`/materias/${id}`);

}


}