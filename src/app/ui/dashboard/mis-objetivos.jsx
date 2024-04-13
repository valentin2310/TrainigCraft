'use client'

import { use, useEffect } from "react"
import { UserContext } from "@/app/providers"
import { Button, useDisclosure } from "@nextui-org/react"
import ObjetivoModalForm from "@/app/ui/objetivos/modal-form"
import GridObjetivos from "@/app/ui/objetivos/grid-objetivos"
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
                <p className="text-xl text-primary font-semibold"><i className="ri-focus-2-line me-2"></i>Mis objetivos</p>
                <div className="flex gap-2">
                    <Button onPress={onOpen} variant="ghost" color="primary" startContent={<i className="ri-file-add-line"></i>}>
                        <span className="hidden sm:inline">Añadir</span>
                    </Button>
                    <Button variant="ghost" color="primary" startContent={<i className="ri-eye-line"></i>}>
                        <span className="hidden sm:inline">Ver todas</span>
                    </Button>
                </div>
             </div>
            
            <GridObjetivos lista={objetivos} />

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