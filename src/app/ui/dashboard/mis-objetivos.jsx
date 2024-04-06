'use client'

import { use, useEffect } from "react"
import { UserContext } from "@/app/providers"
import { Button, useDisclosure } from "@nextui-org/react"
import { ObjetivoModalForm } from "@/app/ui/objetivos/ModalForm"
import GridObjetivos from "@/app/ui/grid-objetivos"
import { useObjetivos } from "@/app/stores/use-objetivos"

export default function MisObjetivos({ nObjetivos = 10 }) {
    const user = use(UserContext)
    const { objetivos, updateObjetivos, updateCant } = useObjetivos()
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()

    useEffect(() => {
        if (!user) return

        updateCant(nObjetivos)
        updateObjetivos(user.id, nObjetivos)
        
    }, [user])

    return (
        <>
             <div className="w-full flex justify-between items-center">
                <p className="text-xl text-primary font-semibold mb-3">Mis objetivos</p>
                <div className="flex gap-2">
                    <Button onPress={onOpen}>
                        <i className="ri-file-add-line m-2"></i><span className="hidden sm:inline">Añadir</span>
                    </Button>
                    <Button>
                        <i className="ri-eye-line m-2"></i><span className="hidden sm:inline">Ver todas</span>
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