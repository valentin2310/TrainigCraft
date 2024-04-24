import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button, Chip } from "@nextui-org/react"

export default function CalendarioModalRutinaInfo({ isOpen, onClose, onOpenChange, rutina, fecha }) {
    return (
        <>
            <Modal className="z-50" size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='bg-secondary'>
                                <p className='font-bold text-white'>Información de la rutina</p>
                            </ModalHeader>
                            <ModalBody className="max-h-[500px] overflow-y-auto">
                                <div className="py-3">
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
                                    <p className="mt-5"><span className="font-bold">Día:</span> {fecha}</p>
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger">Quitar</Button>
                                <Button variant="light" color="secondary" onPress={onClose}>Cerrar</Button>
                                <Button color="primary">Ver más</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}