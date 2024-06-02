'use client'

import { signOutUser } from "@/app/lib/auth"
import { useRouter } from "next/navigation"
import { Avatar } from "@nextui-org/react"

export default function UserCard({ user }) {
    const router = useRouter()

    async function handleLogout() {
        await signOutUser();
        await fetch("/api/logout")

        router.push('/')
    }

    return (
        <div className="flex flex-col gap-1">
            {user &&
                <div className="flex gap-5 bg-white/50 backdrop-blur py-4 px-4 sm:pe-8 rounded-lg shadow">
                    <Avatar isBordered color="primary" src={user.photoUrl} size="lg"></Avatar>
                    <div className="">
                        <p className="text-lg font-bold">{user.usuario}</p>
                        <p>{user.correo}</p>
                    </div>
                </div>
            }
            <div className="">
                <button
                    type="submit"
                    onClick={handleLogout}
                    className={'text-start w-full py-2 px-4 text-red-500 bg-secondary rounded-lg border-b-2 border-red-500 hover:bg-red-500 hover:text-white duration-500'}
                >
                    <i className={`ri-logout-circle-r-line me-2`}></i><span className="text-sm">Cerrar sesión</span>
                </button>
            </div>
        </div>
    )
}