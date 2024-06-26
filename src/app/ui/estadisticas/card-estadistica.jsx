export default function CardEstadistica({ title, display }) {
    return (
        <>
            <div className="flex w-full flex-col items-center bg-dark/5 rounded p-2 shadow text-center">
                <div className="text-lg sm:text-xl md:text-2xl font-semibold text-primary">{display}</div>
                <p className="text-xs sm:text-sm">{title}</p>
            </div>
        </>
    )
}