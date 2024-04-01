'use client'

import { Image } from "@nextui-org/react"
import NavLinks from "./nav-links"
import { signOutUser } from "@/app/lib/auth"

export default function Navbar() {
    return (
        <header className="w-full sm:h-screen sm:w-[320px] bg-dark px-2 sm:py-10 sm:px-5 text-white">
            <div className="hidden sm:grid place-items-center px-4">
                <p className="text-xl text-primary text-center font-bold">TrainigCraft</p>
                <Image
                    radius="none"
                    width={100}
                    alt="Logo"
                    src="/logo.png"
                    className="my-10"
                />
                <hr className="w-full" />
            </div>
            <div className="flex sm:flex-col gap-3 overflow-x-auto py-2 sm:py-8">
                <NavLinks />
            </div>
            <form action={signOutUser}>
                <button 
                    type="submit"
                    onClick={signOutUser}
                    className={'hidden sm:block text-start w-full py-2 px-4 text-red-500 bg-secondary rounded-lg border-b-2 border-red-500 hover:bg-red-500 hover:text-white duration-500'}
                >
                    <i className={`ri-logout-circle-r-line sm:me-2`}></i><span className="hidden sm:inline">Cerrar sesión</span>
                </button>
            </form>
        </header>
    )
}