interface CardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    themeColor: string;
    bgColor: string;
    onClick: () => void;
}

export const DashboardCard = ({ title, description, icon, themeColor, bgColor, onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            // bgColor a toda la tarjeta
            className={`${bgColor} p-8 rounded-[35px] flex flex-col items-start hover:scale-[1.02] transition-all duration-300 cursor-pointer shadow-sm w-full border border-white/50`}
        >

            <div className={`bg-white ${themeColor} p-4 rounded-2xl mb-6 shadow-sm`}>
                {icon}
            </div>

            {/* Título */}
            <h3 className={`text-xl font-extrabold mb-3 ${themeColor}`}>
                {title}
            </h3>

            {/* Descripción  */}
            <p className={`text-sm leading-relaxed font-medium opacity-70 ${themeColor}`}>
                {description}
            </p>
        </div>
    );
};