'use client'

import { Button } from "@nextui-org/react"

export default function Page() {
    return (
        <>
            <div className="w-full flex justify-between items-center">
                <p className="text-xl text-primary font-semibold mb-3">Mis rutinas</p>
                <div className="flex gap-2">
                    <Button>
                        <i className="ri-file-add-line m-2"></i><span className="hidden sm:inline">Añadir</span>
                    </Button>
                </div>
             </div>
        </>
    )
}