import { Home, Book, Users, GraduationCap } from 'lucide-react';

interface SidebarProps {
    currentView: string;
    setView: (view: string) => void;
}

export const Sidebar = ({ currentView, setView }: SidebarProps) => {

    // 1. Definimos los colores por sección
    const sectionStyles: Record<string, { color: string, border: string, bg: string }> = {
        home: { color: 'text-slate-600', border: 'border-slate-600', bg: 'bg-slate-50' },
        alumnos: { color: 'text-[#2EC4D6]', border: 'border-[#2EC4D6]', bg: 'bg-cyan-50/50' },   // Azul
        materias: { color: 'text-[#8B5CF6]', border: 'border-[#8B5CF6]', bg: 'bg-purple-50/50' }, // Morado
        notas: { color: 'text-[#F2994A]', border: 'border-[#F2994A]', bg: 'bg-orange-50/50' },   // Naranja
    };

    // 2. Función para generar las clases dinámicas
    const getBtnClass = (view: string) => {
        const isActive = currentView === view;
        const style = sectionStyles[view] || sectionStyles.home;

        return `
            flex items-center gap-4 w-full px-6 py-4 transition-all duration-300 group
            ${isActive
            ? `${style.bg} border-r-4 ${style.border} ${style.color} shadow-sm font-bold`
            : `text-gray-400 hover:${style.color}`
        }
        `;
    };

    return (
        <aside className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col py-8 fixed left-0 top-0 shadow-sm">
            {/* Título del Proyecto */}
            <div className="px-8 mb-12">
                <h2 className="text-2xl font-black text-[#2D3142] tracking-tighter italic">API Manage</h2>
            </div>

            {/* Sección: MAIN MENU */}
            <div className="flex flex-col mb-8">
                <p className="px-8 text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-6">Administración</p>

                <button onClick={() => setView('home')} className={getBtnClass('home')}>
                    <Home size={18} />
                    <span className="text-[11px] uppercase tracking-wider">Inicio</span>
                </button>

                <button onClick={() => setView('alumnos')} className={getBtnClass('alumnos')}>
                    <Users size={18} />
                    <span className="text-[11px] uppercase tracking-wider">Alumnos</span>
                </button>

                <button onClick={() => setView('materias')} className={getBtnClass('materias')}>
                    <Book size={18} />
                    <span className="text-[11px] uppercase tracking-wider">Materias</span>
                </button>

                <button onClick={() => setView('notas')} className={getBtnClass('notas')}>
                    <GraduationCap size={18} />
                    <span className="text-[11px] uppercase tracking-wider">Notas</span>
                </button>
            </div>
        </aside>
    );
};