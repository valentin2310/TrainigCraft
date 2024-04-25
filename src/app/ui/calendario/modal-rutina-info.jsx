import { destroyEvento } from "@/app/lib/data"
import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button, Chip, Image } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export default function CalendarioModalRutinaInfo({ isOpen, onClose, onOpenChange, userId, rutina, evento, eventos, setEventos }) {
    const router = useRouter()

    const handleQuitar = async () => {
        await destroyEvento(userId, evento.id)
        const _list = eventos.filter((item) => item.id != evento.id)
        setEventos(_list)

        onClose()
    }

    const handleVerMas = () => {
        onClose()
        router.push(`/dashboard/rutinas/${rutina.id}`);
    }
    
    return (
        <>
            <Modal className="z-50" size="lg" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='bg-secondary'>
                                <p className='font-bold text-white'>Información de la rutina</p>
                            </ModalHeader>
                            <ModalBody className="max-h-[500px] overflow-y-auto">
                                <div className="py-3">
                                    <div className="flex gap-3">
                                        <Image
                                            src="/cards/planificacion.png"
                                            width={100}
                                            height={100}
                                            alt="Imagen rutina"
                                        />
                                        <div className="">
                                            <p><span className="font-bold">Titulo:</span> {rutina.titulo}</p>
                                            <p><span className="font-bold">Descripción:</span> {rutina.descripcion ?? 'Sin descripción'}</p>
                                            <p><span className="font-bold">Categorias:</span> </p>
                                            <div className="px-2">
                                                {rutina.categorias && rutina.categorias?.map((cat) => (
                                                    <Chip key={cat.nombre} size="sm" className="border-0" variant="bordered" startContent={<i className="ri-circle-fill" style={{ color: cat.color }}></i>}>
                                                        {cat.nombre}
                                                    </Chip>
                                                ))}
                                            </div>
                                            <p className="mt-5"><span className="font-bold">Día:</span> {evento.date}</p>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button onClick={handleQuitar} color="danger">Quitar</Button>
                                <Button variant="light" color="secondary" onPress={onClose}>Cerrar</Button>
                                <Button onClick={handleVerMas} color="primary">Ver más</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}