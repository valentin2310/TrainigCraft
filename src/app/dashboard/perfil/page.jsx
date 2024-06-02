'use client'

import { UserContext } from "@/app/providers"
import MisEstadisticas from "@/app/ui/perfil/mis-estadisticas"
import MisObjetivosGrid from "@/app/ui/perfil/mis-objetivos-grid"
import MisSesiones from "@/app/ui/perfil/mis-sesiones"
import { Button, Avatar, Link, Tabs, Tab } from "@nextui-org/react"
import { Suspense, useContext } from "react"

export default function Page() {
    const user = useContext(UserContext)

    return (
        <>
            {/* Datos de usuario */}
            <div className="mb-3 sm:mb-10">
                <div className="flex justify-between px-2 mb-3">
                    <p className="font-semibold text-xl text-primary">Mi perfil</p>
                    {/* <Link href="#">
                        <Button className="sm:hidden rounded-full" size="sm" variant="flat" color="primary" isIconOnly startContent={<i className="ri-edit-2-line"></i>} />
                        <Button className="hidden sm:flex" variant="flat" color="primary" startContent={<i className="ri-edit-2-line text-xl"></i>}>
                            <span>Editar</span>
                        </Button>
                    </Link> */}
                </div>
                <div className="flex flex-col md:flex-row gap-3 md:gap-10 items-center mt-3 md:mt-0">
                    {user &&
                        <>
                            <Avatar isBordered color="primary" src={user.photoUrl} className="w-30 h-30"></Avatar>
                            <div className="border-b-2 md:border-b-0 md:border-l-4 border-primary py-2 px-4 text-center md:text-start">
                                <div className="text-lg flex flex-wrap justify-center md:justify-normal sm:text-xl md:text-2xl">
                                    <span className="text-xl sm:text-2xl md:text-3xl font-bold">@{user.usuario}
                                        <span className="text-primary font-semibold md:font-bold me-2">/</span>
                                    </span>
                                    {user.nombre}
                                </div>
                                <p className="text-medium sm:text-lg md:text-xl">{user.correo}</p>
                            </div>
                        </>
                    }
                </div>
            </div>

            <div className="w-full sm:mt-3">
                <Tabs aria-label="Opciones" color="primary" fullWidth
                    classNames={{
                        base: "md:max-w-fit",
                        tab: "md:max-w-fit",
                    }}>
                    <Tab key="objetivos" title={
                        <>
                            <div className="flex items-center space-x-2">
                                <i className="ri-focus-2-line"></i>
                                <span>Objetivos</span>
                            </div>
                        </>
                    }>
                        <div className="mt-3"></div>
                        <MisObjetivosGrid />

                    </Tab>
                    <Tab key="estadisticas" title={
                        <>
                            <div className="flex items-center space-x-2">
                                <i className="ri-bar-chart-2-line"></i>
                                <span>Estadisticas</span>
                            </div>
                        </>
                    }>
                        <div className="mt-3"></div>
                        <MisEstadisticas idUser={user?.id} />
                    </Tab>
                    <Tab key="historial" title={
                        <>
                            <div className="flex items-center space-x-2">
                                <i className="ri-history-line"></i>
                                <span>Historial</span>
                            </div>
                        </>
                    }>
                        <div className="mt-3"></div>
                        <MisSesiones />
                    </Tab>
                </Tabs>
            </div>

        </>
    )
}