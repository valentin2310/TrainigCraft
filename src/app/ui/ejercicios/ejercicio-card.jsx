import { Chip, Image, useDisclosure } from '@nextui-org/react'
import CardEditDots from '@/app/ui/card-edit-dots'
import EjercicioModalForm from '@/app/ui/ejercicios/modal-form'
import EjercicioModalDelete from '@/app/ui/ejercicios/modal-delete'

export default function EjercicioCard({ ejercicio }) {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const {isOpen : delIsOpen, onOpen : delOnOpen, onClose : delOnClose, onOpenChange : delOnOpenChange} = useDisclosure()

    return (
        <>
        <div className="flex justify-between gap-3 bg-gray-100 shadow rounded-xl p-4">
            <div className="">
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