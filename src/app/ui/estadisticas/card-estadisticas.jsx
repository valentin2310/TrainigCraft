export default function CardEstadisticas({ children, title }) {
    return (
        <div className="w-full bg-gradient-to-tl from-gray-50 to-gray-100 text-secondary p-2 sm:p-4 rounded-xl shadow">
            <p className="text-sm sm:text-medium text-center font-semibold italic mb-3">{title}</p>
            <div className="grid grid-cols-3 gap-3">
                {children}
            </div>
        </div>
    )
}