'use client'

import { UserContext } from "@/app/providers"
import MisObjetivos from "@/app/ui/dashboard/mis-objetivos"
import { Button, Avatar } from "@nextui-org/react"
import { Suspense, useContext } from "react"

export default function Page() {
    const user = useContext(UserContext)

    return (
        <>
            {/* Datos de usuario */}
            <div className="mb-10">
                <div className="flex justify-between px-4">
                    <p>Mi perfil</p>
                    <Button color="primary" variant="ghost"> <i className="ri-edit-2-line m-2"></i>Editar</Button>
                </div>
                <div className="flex gap-10 items-center">
                    {user && 
                        <>
                            <Avatar isBordered color="primary" src={user.photoUrl} className="w-30 h-30"></Avatar>
                            <div className="border-l-4 border-primary py-2 px-4">
                                <p className="text-2xl"><span className="text-3xl font-bold">@{user.usuario}<span className="text-primary me-2">/</span></span>{user.nombre}</p>
                                <p className="text-xl">{user.correo}</p>
                            </div>
                        </>
                    }
                </div>
            </div>

            {/* Objetivos */}
            <MisObjetivos nObjetivos={20} />
        </>
    )
}