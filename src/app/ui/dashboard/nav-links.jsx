'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import clsx from 'clsx'

const links = [
    {
        name: 'Inicio',
        href: '/dashboard',
        icon: 'ri-home-3-line'
    },
    {
        name: 'Perfil',
        href: '/dashboard/perfil',
        icon: 'ri-user-3-line'
    },
    {
        name: 'Rutinas',
        href: '/dashboard/rutinas',
        icon: 'ri-list-check-2'
    },
    {
        name: 'Ejercicios',
        href: '/dashboard/ejercicios',
        icon: 'ri-file-paper-2-line'
    },
    {
        name: 'Calendario',
        href: '/dashboard/calendario',
        icon: 'ri-calendar-2-line'
    },
]

export default function NavLinks() {
    const pathname = usePathname()

    return (
        <>
            {links.map((link) => {
                    return (
                        <Link 
                            key={link.name}
                            href={link.href}
                            className={clsx(
                                'w-full py-2 px-4 bg-secondary rounded-lg border-b-2 hover:bg-secondary/50 duration-500 flex flex-col sm:flex-row items-center',
                                {
                                    'text-primary bg-secondary/50 border-primary': pathname === link.href
                                }
                            )}
                        >
                            <i className={`${link.icon} sm:me-2`}></i>
                            <span className="text-xs sm:text-md">{link.name}</span>
                        </Link>
                    )
                })
            }
        </>
    )
}