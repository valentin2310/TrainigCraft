import { Modal, ModalHeader, ModalContent, ModalBody, ModalFooter, Button, Chip } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import FiltroRutinas from '@/app/ui/rutinas/rutinas-filtro'
import RutinaCardSimple from '@/app/ui/rutinas/rutina-card-simple'
import { updateEventos } from '@/app/lib/data'

export default function CalendarioModalAddRutina({ isOpen, onClose, onOpenChange, userId, rutinas, categorias, filteredRutinas, setFilteredRutinas, eventos, setEventos, selectedDate }) {
    const state = null;

    const [selected, setSelected] = useState([])

    const addSelected = (value) => {
        if (isSelected(value.id)) {
            removeSelected(value.id)
            return;
        }

        const _aux = [... selected]
        _aux.push({
            rutinaId: value.id,
            titulo: value.titulo
        })
        setSelected(_aux)
    }

    const removeSelected = (id) => {
        const _aux = selected.filter((item) => item.rutinaId != id)
        setSelected(_aux)
    }

    const isSelected = (id) => {
        const res = selected
            .map((item) => item.rutinaId)    
            .includes(id)

        return res
    }

    const handleSubmit = async () => {
        const _list = selected.map((item) => ({
            rutinaId: item.rutinaId,
            title: item.titulo ?? item.title,
            date: selectedDate ?? new Date.toISOString().split('T')[0],
        }))

        const newEventos = await updateEventos(userId, _list, selectedDate);
        const _demas_eventos = eventos.filter((item) => item.date != selectedDate || item.isCompletado);

        setEventos([..._demas_eventos, ...newEventos])
        onClose()
    }

    useEffect(() => {
        if (isOpen == false) return
        
        setFilteredRutinas(rutinas)

        const _list = eventos.filter((item) => item.date == selectedDate && !item.isCompletado);
        setSelected(_list)

        return
    }, [selectedDate, isOpen])

    useEffect(() => {
        // Si se ha podido eliminar el estado será success = true
        if (!state?.success) {
            return
        }

        // Eliminar de la lista
        onClose()

    }, [state])

    return (
        <>
            <Modal className="z-50" size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className='bg-secondary'>
                                <p className='font-bold text-white'>Elige las rutinas para esta fecha</p>
                            </ModalHeader>
                            <form >
                                <ModalBody className="max-h-[500px] overflow-y-auto">
                                    <div className="mb-3 grid grid-cols-10 gap-3 py-2">
                                        <FiltroRutinas
                                            rutinas={rutinas}
                                            categorias={categorias}
                                            setFilteredRutinas={setFilteredRutinas}
                                        />
                                    </div>

                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
                                        {filteredRutinas && filteredRutinas.map((item) => (
                                            <div key={item.id} className=""  onClick={() => addSelected(item)}>
                                                <RutinaCardSimple
                                                    rutina={item}
                                                    selected={isSelected(item.id)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="w-full border-t-2 mt-2 pt-4">
                                        <span>Rutinas seleccionadas:</span>
                                        <div className="flex w-full gap-1 justify-start overflow-x-auto mt-2">
                                            {selected && selected.map((item) => (
                                                <Chip key={item.id} onClose={() => removeSelected(item.rutinaId)} variant='flat'>
                                                    { item.titulo ?? item.title }
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>Cancelar</Button>
                                    <Button onClick={handleSubmit} color="primary">Guardar</Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}