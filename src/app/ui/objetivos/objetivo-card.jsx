import { Rate } from "rsuite"
import clsx from "clsx"
import { renderRateCharacter } from "@/app/lib/utils"
import { Popover, PopoverTrigger, PopoverContent, Button, Listbox, ListboxItem, useDisclosure } from '@nextui-org/react'
import ObjetivoModalForm from "@/app/ui/objetivos/modal-form"
import { useState } from "react"
import ObjetivoModalDelete from "@/app/ui/objetivos/modal-delete"

export default function ObjetivoCard({ objetivo }) {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const {isOpen : delIsOpen, onOpen : delOnOpen, onClose : delOnClose, onOpenChange : delOnOpenChange} = useDisclosure()
    const [popIsOpen, popSetIsOpen] = useState(false)

    return (
        <>
        <div className={clsx(
            "w-full md:w-[500px] bg-gradient-to-br from-secondary to-secondary/90 text-white p-4 rounded-xl shadow border-b-4 border-dark flex justify-between gap-3",
            {
                'border-primary': objetivo.fecha_completado != null,
            }
        )}>
            <div className="flex gap-5">
                <div className={clsx(
                    'text-5xl',
                    {
                        'text-amber-700' : objetivo.importancia <= 1,
                        'text-slate-400' : objetivo.importancia == 2,
                        'text-yellow-500' : objetivo.importancia >= 3,
                    },
                    {
                        'text-opacity-20' : objetivo.fecha_completado == null
                    }
                )}>
                    <i className="ri-medal-line"></i>
                </div>
                <div className="">
                    <div className="flex gap-3 items-baseline">
                        <p className="text-xl">{objetivo.titulo}</p>
                        <Rate allowHalf defaultValue={objetivo.dificultad} readOnly size="xs"  renderCharacter={renderRateCharacter} />
                    </div>
                    <p className="line-clamp-2 text-gray-300">{objetivo.descripcion ? objetivo.descripcion : 'Sin descripción.'}</p>
                </div>
            </div>
            <Popover placement="right" crossOffset={8} className="z-20" isOpen={popIsOpen} onOpenChange={(open) => popSetIsOpen(open)}>
                <PopoverTrigger>
                    <div className="px-1 text-xl hover:bg-gray-600 duration-500 h-fit rounded-full cursor-pointer">
                        <i className="ri-more-2-line"></i>
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <div className="py-1 max-w-[250px]">
                        <Listbox
                            aria-label="Actions"
                            onAction={(key) => {
                                switch (key) {
                                    case 'edit':
                                        console.log('editar', objetivo.id)
                                        onOpen()
                                        break;
                                
                                    case 'delete':
                                        console.log('eliminar', objetivo.id)
                                        delOnOpen()
                                        break;
                                }
                                popSetIsOpen(false)
                            }}
                        >
                            <ListboxItem key="edit">
                                <i className="ri-edit-2-line me-2"></i>Editar
                            </ListboxItem>
                            <ListboxItem key="delete" className="text-danger" color="danger">
                                <i className="ri-delete-bin-2-line me-2"></i>Eliminar
                            </ListboxItem>
                        </Listbox>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
            
            {/* Modal para modificar el objetivo */}
            <ObjetivoModalForm 
                objetivo={objetivo}
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
            />

            {/* Modal para confirmar la eliminación del objetivo */}
            <ObjetivoModalDelete 
                objetivo={objetivo}
                isOpen={delIsOpen}
                onClose={delOnClose}
                onOpenChange={delOnOpenChange}
            />
        </>
    )
}