'use client'

import { fetchDefaultEjercicios } from "@/app/lib/data"
import { useEjercicios } from "@/app/stores/use-ejercicios"
import { Button, useDisclosure } from "@nextui-org/react"
import { useEffect } from "react"
import GridEjercicios from "@/app/ui/ejercicios/grid-ejercicios"
import EjercicioModalForm from "@/app/ui/ejercicios/modal-form"
import { useMusculos } from "@/app/stores/use-musculos"

export default function Page() {
    const { ejercicios, setEjercicios } = useEjercicios()
    const { musculos, getDefault: getDefaultMusculos } = useMusculos()
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()

    const fetchData = async () => {
        const _ejercicios = await fetchDefaultEjercicios();
        setEjercicios(_ejercicios)
    }
    
    useEffect(() => {
        fetchData()
        getDefaultMusculos()

    }, [])

    return (
        <>
            <div className="w-full flex justify-between items-center mb-10">
                <p className="text-xl text-primary font-semibold mb-3">Mis ejercicios</p>
                <div className="flex gap-2">
                    <Button onPress={onOpen}>
                        <i className="ri-file-add-line m-2"></i><span className="hidden sm:inline">Añadir</span>
                    </Button>
                </div>
             </div>

             <GridEjercicios lista={ejercicios} />

             <EjercicioModalForm 
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                musculos={musculos}
             />
        </>
    )
}