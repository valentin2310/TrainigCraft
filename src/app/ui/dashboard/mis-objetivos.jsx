'use client'

import { use, useEffect } from "react"
import { UserContext } from "@/app/providers"
import { Button, Link, useDisclosure } from "@nextui-org/react"
import ObjetivoModalForm from "@/app/ui/objetivos/modal-form"
import ScrollObjetivos from "@/app/ui/objetivos/scroll-objetivos"
import { useObjetivos } from "@/app/stores/use-objetivos"

export default function MisObjetivos({ nObjetivos = 10 }) {
    const user = use(UserContext)
    const { objetivos, updateObjetivos, cant, updateCant } = useObjetivos()
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    
    useEffect(() => {
        updateCant(nObjetivos)
    }, [])

    useEffect(() => {
        if (!user) return
        
        updateObjetivos(user.id, cant)
        
    }, [user, cant])

    return (
        <>
             <div className="w-full flex justify-between items-center mb-2">
                <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-focus-2-line me-2"></i>Mis objetivos</p>
                <div className="flex gap-1 sm:gap-2">
                    <Button className="sm:hidden rounded-full" size="sm" onPress={onOpen} variant="flat" color="primary" isIconOnly startContent={<i className="ri-file-add-line"></i>} />
                    
                    <Button className="hidden sm:flex" onPress={onOpen} variant="flat" color="primary" startContent={<i className="ri-file-add-line text-lg"></i>}>
                        <span>Añadir</span>
                    </Button>

                    <Link href="dashboard/perfil">
                        <Button className="sm:hidden rounded-full" size="sm" variant="flat" color="primary" isIconOnly startContent={<i className="ri-eye-line"></i>} />
                        <Button className="hidden sm:flex" variant="flat" color="primary" startContent={<i className="ri-eye-line text-lg"></i>}>
                            <span>Ver todas</span>
                        </Button>
                    </Link>
                </div>
             </div>
            
            {(objetivos && objetivos.length > 0) && 
                <ScrollObjetivos lista={objetivos} />
                ||
                <p className="text-sm italic px-2"><i className="ri-information-2-line text-primary me-2"></i>No tienes ningún objetivo</p>
            }

            {user && 
                <ObjetivoModalForm 
                    userId={user.id}
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                />
            }
            
        </>
    )
}