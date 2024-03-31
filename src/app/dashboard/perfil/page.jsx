'use client'

import { UserContext } from "@/app/providers"
import { Button, Avatar } from "@nextui-org/react"
import { useContext } from "react"

export default function Page() {
    const user = useContext(UserContext)

    return (
        <>
            <div className="">
                <div className="flex justify-between px-4">
                    <p>Mi perfil</p>
                    <Button color="primary" variant="ghost"> <i className="ri-edit-2-line m-2"></i>Editar</Button>
                </div>
                <div className="flex gap-10 items-center">
                    <Avatar isBordered color="primary" src={user.photoURL} className="w-30 h-30"></Avatar>
                    <div className="border-l-4 border-primary py-2 px-4">
                        <p className="text-3xl font-bold">{user.displayName}</p>
                        <p className="text-xl">{user.email}</p>
                    </div>
                </div>
            </div>
        </>
    )
}