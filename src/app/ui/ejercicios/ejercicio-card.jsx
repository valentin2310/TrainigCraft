import { Button, Chip, Image, Popover, PopoverContent, PopoverTrigger, ScrollShadow, Tooltip, useDisclosure } from '@nextui-org/react'
import CardEditDots from '@/app/ui/card-edit-dots'
import EjercicioModalForm from '@/app/ui/ejercicios/modal-form'
import EjercicioModalDelete from '@/app/ui/ejercicios/modal-delete'
import { dificultadColor, dificultadColorBorder, renderRateCharacter } from '@/app/lib/utils'
import { Rate } from 'rsuite'
import { useState } from 'react'
import '@/styles/dificultad-component.css'

export default function EjercicioCard({ ejercicio }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const { isOpen: delIsOpen, onOpen: delOnOpen, onClose: delOnClose, onOpenChange: delOnOpenChange } = useDisclosure()
    const [isOpenTooltip, setIsOpenTooltip] = useState(false)

    return (
        <>
            {/* <div className="flex justify-between gap-3 bg-gray-100 shadow rounded-xl p-2 pt-4">
                
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
                                    - { ejercicio.musculos.join(', ') }
                                </div>
                            }
                        </div>
                    </div>
                <CardEditDots
                    onOpen={onOpen}
                    delOnOpen={delOnOpen}
                />
            </div> */}

            <div className="flex flex-col bg-gradient-to-tl from-gray-50 to-gray-100 shadow rounded-xl p-1">
                <div className="relative">
                    <Image
                        alt={`Imagen del ejercicio ${ejercicio.nombre}`}
                        src={ejercicio.imgPath ?? "/excercises/img-excercise1.png"}
                        fallbackSrc={"/excercises/img-excercise1.png"}
                        isZoomed
                    />
                    <div className="z-50 absolute top-2 right-2 bg-dark/15 rounded-full">
                        <CardEditDots
                            onOpen={onOpen}
                            delOnOpen={delOnOpen}
                        />
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="flex flex-col">
                        <Rate value={ejercicio.dificultad} size='xs' readOnly renderCharacter={renderRateCharacter} />
                        <p className="text-md font-semibold line-clamp-2 mt-2">{ejercicio.nombre}</p>
                        <ScrollShadow className='w-full line-clamp-3 sm:line-clamp-4'>
                            <div className="text-small">{ejercicio.descripcion != '' ? ejercicio.descripcion : 'Sin descripción'}</div>
                        </ScrollShadow>
                    </div>
                        {ejercicio.musculos?.length > 0 &&
                            <div className='w-full bg-secondary/5 rounded-lg p-1'>
                                <div className="flex gap-1 text-xs italic line-clamp-1">
                                    - {ejercicio.musculos.join(', ')}
                                </div>
                            </div>
                        }
                    {/* <Popover placement="bottom" showArrow={true}>
                        <PopoverTrigger>
                            <Button variant="light" color="primary" isIconOnly startContent={<i className="ri-information-2-line text-xl text-primary"></i>} />
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="px-1 py-2 flex flex-col gap-2">
                                <div className="text font-bold">{ejercicio.nombre}</div>
                                <div className="text-small">{ejercicio.descripcion}</div>
                                <Rate value={ejercicio.dificultad} size='xs' readOnly renderCharacter={renderRateCharacter} />
                                {ejercicio.musculos?.length > 0 &&
                                    <div>
                                        Musculos:
                                        <div className="flex overflow-x-auto gap-1 text-xs italic line-clamp-1">
                                            - {ejercicio.musculos.join(', ')}
                                        </div>
                                    </div>
                                }
                            </div>
                        </PopoverContent>
                    </Popover> */}
                </div>
            </div>

            {/* Modal para modificar el objetivo */}
            <EjercicioModalForm
                ejercicio={ejercicio}
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
            />

            {/* Modal para confirmar la eliminación del objetivo */}
            <EjercicioModalDelete
                ejercicio={ejercicio}
                isOpen={delIsOpen}
                onClose={delOnClose}
                onOpenChange={delOnOpenChange}
            />
        </>
    )
}