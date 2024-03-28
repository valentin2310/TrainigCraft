export default function RutinaCard({rutina}) {
    return (
        <div className="p-4 bg-gray-200 rounded shadow">
            <p className="text-xl">{rutina.titulo}</p>
            <p>Descripcion: {rutina.descripcion}</p>
        </div>
    )
}