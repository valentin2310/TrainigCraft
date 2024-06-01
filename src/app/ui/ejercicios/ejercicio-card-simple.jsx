import { Chip, Image, ScrollShadow, useDisclosure } from '@nextui-org/react'
import { dificultadColor, dificultadColorBorder, renderRateCharacter } from '@/app/lib/utils'
import clsx from 'clsx'
import { Rate } from 'rsuite'
import '@/styles/dificultad-component.css'

export default function EjercicioCardSimple({ ejercicio, selected = false }) {
    return (
        <>
            <div className={clsx(
                "p-1 rounded-xl shadow text-secondary cursor-pointer h-full",
                { 'bg-primary': selected }
            )}>
                {/* <div className="flex justify-between gap-3 bg-gray-100 shadow rounded-xl p-2 pt-4 h-full">
                    <div className="grid grid-cols-3 gap-3">
                        <Image
                            alt={`Imagen del ejercicio ${ejercicio.nombre}`}
                            src={ejercicio.imgPath ?? "/excercises/img-excercise1.png"}
                            fallbackSrc={"/excercises/img-excercise1.png"}
                            className={`col-span-2 border-3 ${dificultadColorBorder(ejercicio.dificultad)}`}
                        />
                        <div className="col-span-2">
                            <p className="text-md font-bold line-clamp-1">{ejercicio.nombre}</p>
                            <p className="mb-2 text-small">
                                <span className="line-clamp-2">{ejercicio.descripcion}</span>
                            </p>
                            {ejercicio.musculos?.length > 0 &&
                                <div className="flex overflow-x-auto gap-1 text-xs italic line-clamp-1">
                                    - {ejercicio.musculos.join(', ')}
                                </div>
                            }
                        </div>
                    </div>
                </div> */}
                <div className="h-full flex flex-col bg-gradient-to-tl from-gray-50 to-gray-100 shadow rounded-xl p-1">
                    <div className="relative">
                        <Image
                            alt={`Imagen del ejercicio ${ejercicio.nombre}`}
                            src={ejercicio.imgPath ?? "/excercises/img-excercise1.png"}
                            fallbackSrc={"/excercises/img-excercise1.png"}
                            isZoomed
                        />
                    </div>
                    <div className="flex flex-col gap-2 p-2">
                        <div className="flex flex-col">
                            <Rate value={ejercicio.dificultad} size='xs' readOnly renderCharacter={renderRateCharacter} />
                            <p className="text-small sm:text-medium font-semibold line-clamp-2 mt-2">{ejercicio.nombre}</p>
                            <div className='w-full line-clamp-2'>
                                <div className="text-tiny sm:text-small">{ejercicio.descripcion != '' ? ejercicio.descripcion : 'Sin descripción'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}