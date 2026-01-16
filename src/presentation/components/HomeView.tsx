import { Users, BookOpen, GraduationCap } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';

export const HomeView = ({ setView }: { setView: (v: string) => void }) => {
    return (

        <div className="max-w-10xl mx-auto w-full animate-in fade-in slide-in-from-bottom-6 duration-1000">

            {/* SECCIÓN DE TÍTULO */}
            <header className="mb-16">
                <h1 className="text-4xl font-black text-slate-800 tracking-tighter">
                    Panel de gestion Principal
                </h1>
                <p className="text-xl text-slate-400 mt-4 font-medium max-w-1xl leading-relaxed">
                    Selecciona una categoría para comenzar:
                </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">


                <DashboardCard
                    title="Alumnos"
                    description="Visualiza y gestiona la base de datos de estudiantes."
                    icon={<Users size={30} />}
                    themeColor="text-blue-400"
                    bgColor="bg-[#E9F8FC]" // Azul Pastel
                    onClick={() => setView('alumnos')}
                />

                <DashboardCard
                    title="Materias"
                    description="Organiza las asignaturas y planes de estudio."
                    icon={<BookOpen size={30} />}
                    themeColor="text-purple-500"
                    bgColor="bg-[#F1F0FF]" // Morado Pastel
                    onClick={() => setView('materias')}
                />

                <DashboardCard
                    title="Notas"
                    description="Registra calificaciones y reportes académicos."
                    icon={<GraduationCap size={30} />}
                    themeColor="text-orange-400"
                    bgColor="bg-[#FFF1E8]" // Naranja Pastel
                    onClick={() => setView('notas')}
                />

            </div>
        </div>
    );
};