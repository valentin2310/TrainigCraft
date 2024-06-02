'use client'

import { use, useEffect } from "react"
import { UserContext } from "@/app/providers"
import { Button, Link, useDisclosure } from "@nextui-org/react"
import ObjetivoModalForm from "@/app/ui/objetivos/modal-form"
import ScrollObjetivos from "@/app/ui/objetivos/scroll-objetivos"
import { useObjetivos } from "@/app/stores/use-objetivos"
import { fetchObjetivos, fetchObjetivosSinCompletar } from "@/app/lib/data"

export default function MisObjetivos({ nObjetivos = 10, sinCompletar = false }) {
    const user = use(UserContext)
    const { objetivos, setObjetivos } = useObjetivos()
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()

    const fetchData = async () => {
        if (sinCompletar) {
            const _objetivos = await fetchObjetivosSinCompletar(user.id, nObjetivos)
            setObjetivos(_objetivos)
        } else {
            const _objetivos = await fetchObjetivos(user.id, nObjetivos)
            setObjetivos(_objetivos)
        }
    }

    useEffect(() => {
        if (!user) return
        
       fetchData()
        
    }, [user])

    return (
        <>
             <div className="w-full flex justify-between items-center mb-2">
                <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-focus-2-line me-2"></i>Mis objetivos <span className="italic text-small">(sin completar)</span></p>
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
                <p className="text-sm italic px-2"><i className="ri-information-2-line text-primary me-2"></i>No tienes ningún objetivo sin completar</p>
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