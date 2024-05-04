import { Chip, Image, useDisclosure } from '@nextui-org/react'
import { dificultadColor, dificultadColorBorder } from '@/app/lib/utils'
import clsx from 'clsx'

export default function EjercicioCard({ ejercicio, selected = false }) {
    return (
        <>
            <div className={clsx(
                "p-1 rounded-xl shadow text-secondary cursor-pointer h-full",
                { 'bg-primary': selected }
            )}>
                <div className="flex justify-between gap-3 bg-gray-100 shadow rounded-xl p-2 pt-4 h-full">
                    <div className="flex flex-col justify-between gap-1">
                        <div className="grid grid-cols-5 gap-3">
                            <Image
                                width={70}
                                alt={`Imagen del ejercicio ${ejercicio.nombre}`}
                                src={ejercicio.imgPath ?? "/excercises/img-excercise1.png"}
                                className={`col-span-1 border-3 ${dificultadColorBorder(ejercicio.dificultad)} `}
                            />
                            <div className="col-span-4">
                                <p className="text-md font-bold line-clamp-1">{ejercicio.nombre}</p>
                                <p className="mb-2 text-small">
                                    <span className="line-clamp-2">{ejercicio.descripcion}</span>
                                </p>
                            </div>
                        </div>
                        {ejercicio.musculos &&
                            <div className="flex overflow-x-auto gap-1">
                                {ejercicio.musculos.map((musculo) => (
                                    <Chip key={musculo} size="sm" color="primary" className='border-0 p-0' variant="dot">
                                        {musculo}
                                    </Chip>
                                ))}
                                {/* { ejercicio.musculos.join(', ') } */}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}