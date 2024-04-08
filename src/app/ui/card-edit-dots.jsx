import { Popover, PopoverContent, PopoverTrigger, Listbox, ListboxItem } from '@nextui-org/react'
import { useState } from 'react'

export default function CardEditDots({ onOpen, delOnOpen }) {
    const [popIsOpen, popSetIsOpen] = useState(false)

    return (
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
                                        onOpen()
                                        break;
                                
                                    case 'delete':
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
    )
}