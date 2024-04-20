import { dificultadColor } from "@/app/lib/utils"

export default function ListaEjercicios({ ejercicios }) {
    return (
        <>
            <div className="flex flex-col gap-3">
            { ejercicios.map((item) => (
                <div className="flex gap-2 bg-gray-50 rounded shadow p-2 ps-8">
                    <span>{ item.orden + 1 }º</span>
                    <span>{item.series}x{item.repeticiones}{item.tipo == 'duracion' && ' seg'}</span>
                    <span>{item.ejercicio.nombre}</span>
                    <span>{item.peso > 0 && item.peso + 'kg'}</span>
                    <i className={`ri-fire-fill text-xl ${dificultadColor(item.ejercicio.dificultad)}`}></i>
                </div>
            ))}
            </div>
        </>
    )
}