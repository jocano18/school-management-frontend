import { useState } from 'react';
import { Sidebar } from './presentation/components/Sidebar';
import { HomeView } from './presentation/components/HomeView';
import {AlumnosView} from "./presentation/components/ALumnos.View.tsx";
import {MateriasView} from "./presentation/components/MateriasView.tsx";
import {NotasView} from "./presentation/components/NotasView.tsx";

function App() {
    const [view, setView] = useState('home');

    return (
        <div className="flex bg-[#F8FAFC] min-h-screen">
            {/* 1. SIDEBAR: Se queda fija */}
            <Sidebar currentView={view} setView={setView} />

            {/* 2. CONTENEDOR PRINCIPAL */}

            <main className="flex-1 ml-64 flex flex-col h-screen">

                {/* 3. CONTENEDOR DE VISTAS CON CENTRADO VERTICAL */}
                <div className="flex-1 flex flex-col pt-24 p-10 overflow-y-auto">

                    {/* Renderizado condicional de las vistas */}
                    {view === 'home' && <HomeView setView={setView} />}

                    {/* 2. Vista de Alumnos */}
                    {view === 'alumnos' && <AlumnosView/>}

                    {/* 2. Vista de Materias*/}
                    {view == 'materias' && <MateriasView/>}

                    {/* 2. Vista de Notas*/}
                    {view == 'notas' && <NotasView/>}


                </div>
            </main>
        </div>
    );
}

export default App;