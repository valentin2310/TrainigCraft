'use client'

import { use, useContext, useEffect, useState } from "react"
import { UserContext } from "@/app/providers"
import { fetchUserObjetivos } from "@/app/lib/data"
import { Button, useDisclosure } from "@nextui-org/react"
import { ObjetivoModalForm } from "@/app/ui/objetivos/ModalForm"
import ObjetivoCard from "@/app/ui/objetivos/ObjetivoCard"

export default function MisObjetivos() {
    const user = use(UserContext)
    const [objetivos, setObjetivos] = useState([])
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const nObjetivos = 4

    useEffect(() => {
        if (!user) return

        actualizarObjetivos(user.id, nObjetivos)
        
    }, [user])

    const actualizarObjetivos = async (userId, limit = nObjetivos) => {
        try {
            const data = await fetchUserObjetivos(userId, limit)
            setObjetivos(data)

        } catch (error) {
            console.error(error)
        }
    }

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
            
            <div className="mt-3 grid sm:grid-cols-2 2xl:grid-cols-3 gap-2">
                {objetivos && objetivos.map((obj) => (
                    <ObjetivoCard key={obj.id} objetivo={obj} />
                ))

                }
            </div>

            {user && 
                <ObjetivoModalForm 
                    userId={user.id}
                    isOpen={isOpen}
                    onClose={onClose}
                    onOpenChange={onOpenChange}
                    actualizarObjetivos={actualizarObjetivos}
                    nObjetivos={nObjetivos}
                />
            }
            
        </>
    )
}