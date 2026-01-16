import api from "../../infrastructure/api/axiosConfig";
import type {Alumno} from "../models/Alumno";

export const AlumnoService = {

    getAll: async () =>{
        const response = await  api.get<Alumno[]>('/alumnos');
        return response.data;
    },

    getById : async(id: number) =>{
        const response = await api.get<Alumno>(`/alumnos/${id}`);
        return response.data;
    },

    create : async(alumno : Alumno) =>{
        const response = await api.post<Alumno>('/alumnos', alumno);
        return  response.data;
    },

    update: async(id: number, alumno: Alumno)=>{
        const response = await api.put<Alumno>(`/alumnos/${id}`, alumno);
        return  response.data;
    },

    patchUpdate: async(id:number, datosParciales: Partial<Alumno>) => {
        const response = await api.patch<Alumno>(`/alumnos/${id}`, datosParciales);
        return response.data;
    },

    delete : async(id:number) => await api.delete(`/alumnos/${id}`)

}
