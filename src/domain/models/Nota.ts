import type { Alumno } from "./Alumno";

export interface Nota {
    id?: number;
    valor: number;
    alumno: Alumno;
    nombreMateria: string;
}

export interface NotaRequest {
    valor: number;
    alumnoId: number;
    materiaId: number;
}