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
        <div onClick={handleClick} className="p-1 rounded shadow text-secondary cursor-pointer" style={generarGradient(rutina.categorias)}>
            <div className="p-4 w-full h-full flex justify-between bg-gradient-to-tr from-gray-100/90 to-gray-50/85 backdrop-blur">
                <div className="">
                    <p className="text-xl line-clamp-2">{rutina.titulo}</p>
                    <p className=" line-clamp-3 text-secondary/90">{rutina.descripcion}</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                        {rutina.categorias && rutina.categorias?.map((cat) => (
                            <Chip key={cat.nombre} size="sm" className="border-0" variant="bordered" startContent={<i className="ri-circle-fill" style={{color: cat.color}}></i>}>
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