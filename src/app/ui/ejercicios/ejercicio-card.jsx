import { Chip, Image, useDisclosure } from '@nextui-org/react'
import CardEditDots from '@/app/ui/card-edit-dots'
import EjercicioModalForm from '@/app/ui/ejercicios/modal-form'
import EjercicioModalDelete from '@/app/ui/ejercicios/modal-delete'
import { dificultadColor, dificultadColorBorder } from '@/app/lib/utils'

export default function EjercicioCard({ ejercicio }) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const { isOpen: delIsOpen, onOpen: delOnOpen, onClose: delOnClose, onOpenChange: delOnOpenChange } = useDisclosure()

    return (
        <>
            <div className="flex justify-between gap-3 bg-gray-100 shadow rounded-xl p-2 pt-4">
                <div className="flex flex-col justify-between gap-1">
                    <div className="grid grid-cols-5 gap-3">
                        <Image
                            width={70}
                            alt={`Imagen del ejercicio ${ejercicio.nombre}`}
                            src="/excercises/img-excercise1.png"
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
                <CardEditDots
                    onOpen={onOpen}
                    delOnOpen={delOnOpen}
                />
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