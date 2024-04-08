import { Chip, Image } from '@nextui-org/react'

export default function EjercicioCard({ ejercicio }) {
    return (
        <div className="bg-gray-100 shadow rounded-xl p-4">
            <p className="text-md font-bold line-clamp-2 mb-2">{ejercicio.nombre}</p>
            <p className="mb-2 text-small">
                <span className="line-clamp-3">{ejercicio.descripcion}</span>
            </p>
            <div className="px-2 py-4 grid place-items-center">
                <Image 
                    width={200}
                    alt={`Imagen del ejercicio ${ejercicio.nombre}`}
                    src="/excercises/img-excercise1.png"
                    isZoomed
                />
            </div>
            {ejercicio.musculos &&
                <div className="flex flex-wrap gap-3">
                    {ejercicio.musculos.map((musculo) => (
                        <Chip key={musculo} size="sm" color="primary" variant="dot">
                            {musculo}
                        </Chip>
                    ))}
                </div>
            }
        </div>
    )
}