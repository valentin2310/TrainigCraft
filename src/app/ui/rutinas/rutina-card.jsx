import { generarGradient } from "@/app/lib/utils"
import { Chip, useDisclosure } from "@nextui-org/react"
import CardEditDots from "@/app/ui/card-edit-dots"
import RutinaModalForm from "@/app/ui/rutinas/modal-form"
import RutinaModalDelete from "@/app/ui/rutinas/modal-delete"
import { useRouter } from "next/navigation"

export default function RutinaCard({rutina}) {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const {isOpen : delIsOpen, onOpen : delOnOpen, onClose : delOnClose, onOpenChange : delOnOpenChange} = useDisclosure()
    const router = useRouter()

    const handleClick = () => {
        router.push(`/dashboard/rutinas/${rutina.id}`)
    }

    return (
        <>
        <div onClick={handleClick} className="p-1 rounded-xl shadow text-secondary cursor-pointer" style={generarGradient(rutina.categorias)}>
            <div className="p-3 w-full h-full flex justify-between bg-gradient-to-tr from-gray-100 to-gray-50/95 backdrop-blur rounded-lg">
                <div className="flex flex-col justify-between">
                    <div className="">
                        <p className="text-xl line-clamp-1">{rutina.titulo}</p>
                        <p className="line-clamp-2 text-secondary/90 ps-1">{rutina.descripcion || '...'}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {rutina.categorias && rutina.categorias?.map((cat) => (
                            <Chip key={cat.nombre} size="sm" className="border-0" variant="bordered" startContent={<i className="ri-price-tag-3-line" style={{color: cat.color}}></i>}>
                                {cat.nombre}
                            </Chip>
                        ))}
                    </div>
                </div>
                <CardEditDots 
                    onOpen={onOpen}
                    delOnOpen={delOnOpen}
                    href={`/dashboard/rutinas/${rutina.id}/edit`}
                />
            </div>
        </div>

            {/* Modal para modificar */}
            <RutinaModalForm 
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                rutina={rutina}
            />

            {/* Modal para eliminar */}
            <RutinaModalDelete 
                isOpen={delIsOpen}
                onClose={delOnClose}
                onOpenChange={delOnOpenChange}
                rutina={rutina}
            />
        </>
    )
}