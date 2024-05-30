'use client'

import { use, useEffect } from "react"
import { UserContext } from "@/app/providers"
import { Button, useDisclosure } from "@nextui-org/react"
import ObjetivoModalForm from "@/app/ui/objetivos/modal-form"
import GridObjetivos from "@/app/ui/objetivos/grid-objetivos"
import { useObjetivos } from "@/app/stores/use-objetivos"
import { fetchObjetivos } from "@/app/lib/data"

export default function MisObjetivosGrid() {
    const user = use(UserContext)
    const { objetivos, setObjetivos } = useObjetivos()
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()

    const fetchData = async () => {
        const _objetivos = await fetchObjetivos(user.id)
        setObjetivos(_objetivos)
    }

    useEffect(() => {
        if (!user) return
        
        fetchData()
        
    }, [user])

    return (
        <>
             <div className="w-full flex justify-between items-center mb-2">
                {/* <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-focus-2-line me-2"></i>Mis objetivos</p> */}
                <p className="text-lg xl:text-xl text-primary font-semibold">TODOS LOS OBJETIVOS</p>
                <div className="flex gap-1 sm:gap-2">
                    <Button className="sm:hidden rounded-full" size="sm" onPress={onOpen} variant="flat" color="primary" isIconOnly startContent={<i className="ri-add-circle-line"></i>} />
                    <Button className="sm:hidden rounded-full" size="sm" variant="flat" color="primary" isIconOnly startContent={<i className="ri-eye-line"></i>} />
                    
                    <Button className="hidden sm:flex" onPress={onOpen} variant="flat" color="primary" startContent={<i className="ri-add-circle-line text-lg"></i>}>
                        <span>Añadir</span>
                    </Button>
                    {/* <Button className="hidden sm:flex" variant="flat" color="primary" startContent={<i className="ri-eye-line text-lg"></i>}>
                        <span>Ver todas</span>
                    </Button> */}
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