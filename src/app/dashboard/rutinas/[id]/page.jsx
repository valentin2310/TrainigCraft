'use client'

import { fetchEjerciciosRutina, fetchItem, fetchSesionesEntrenamientoRutina } from "@/app/lib/data";
import { UserContext } from "@/app/providers";
import { use, useEffect, useState } from "react"
import { format } from "rsuite/esm/utils/dateUtils";
import TablaEjerciciosSimple from "@/app/ui/rutinas/tabla-ejercicios-simple";
import { Button, Tabs, Tab, Image, Chip, useDisclosure } from "@nextui-org/react";
import { dificultadColor, formatSecondsToTime } from "@/app/lib/utils";
import { useRouter } from "next/navigation";
import CardEditDots from "@/app/ui/card-edit-dots";
import RutinaModalForm from "@/app/ui/rutinas/modal-form";
import RutinaModalDelete from "@/app/ui/rutinas/modal-delete";
import clsx from "clsx";
import SesionCard from "@/app/ui/sesiones/sesion-card";

export default function Page({ params }) {
    const { id: idRutina } = params
    const [rutina, setRutina] = useState(null)

    const user = use(UserContext)

    const [ejerciciosRutina, setEjerciciosRutina] = useState([]);
    const [sesionesRutina, setSesionesRutina] = useState([])

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure()
    const { isOpen: delIsOpen, onOpen: delOnOpen, onClose: delOnClose, onOpenChange: delOnOpenChange } = useDisclosure()

    const router = useRouter()

    const fetchData = async () => {
        const _rutina = await fetchItem(`usuarios/${user.id}/rutinas/${idRutina}`)
        setRutina(_rutina)
        console.log(_rutina)

        const _rutina_ejercicios = await fetchEjerciciosRutina(_rutina.ejercicios);
        setEjerciciosRutina(_rutina_ejercicios);

        const _sesiones = await fetchSesionesEntrenamientoRutina(user.id, idRutina);
        _sesiones.sort((b, a) => {
            if (a.created_at.seconds < b.created_at.seconds) {
                return -1;
            }
            if (a.created_at.seconds > b.created_at.seconds) {
                return 1;
            }
            // Si los segundos son iguales, comparas los nanosegundos
            if (a.created_at.nanoseconds < b.created_at.nanoseconds) {
                return -1;
            }
            if (a.created_at.nanoseconds > b.created_at.nanoseconds) {
                return 1;
            }
            return 0; // son iguales
        });
        setSesionesRutina(_sesiones)
        console.log(_sesiones)

    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    const calcularFecha = (timestamp) => {
        const { seconds, nanoseconds } = timestamp

        const date = new Date(seconds * 1000 + nanoseconds / 1000000)
        const formattedDate = format(date, 'd/M/yyyy')

        return formattedDate;
    }

    const calcularDificultad = () => {
        if (!ejerciciosRutina || ejerciciosRutina.length == 0) return 0

        let sum = 0;

        ejerciciosRutina.forEach((item) => {
            sum += item.ejercicio.dificultad
        })

        return sum / ejerciciosRutina.length
    }

    const handleClick = () => {
        router.push(`/sesiones/${rutina?.id}`)
    }

    return (
        <>
            <div className="w-full flex justify-between bg-gradient-to-br from-gray-100 to-gray-50 rounded shadow p-3 text-center">
                <div className=""></div>
                <div className="">
                    <h1 className="text-xl md:text-3xl font-semibold text-primary mb-1">{rutina?.titulo}</h1>
                    {rutina?.descripcion &&
                        <p className="px-2 text-lg"><i className="ri-information-2-line text-primary me-2"></i>{rutina?.descripcion ?? 'Sin descripcion..'}</p>
                    }
                    <div className="px-2">
                        {rutina?.categorias && rutina.categorias.map((categoria) => (
                            <Chip key={categoria.color} variant="light" startContent={<i className="ri-price-tag-3-line text-primary" style={{ color: categoria.color }}></i>}>
                                {categoria.nombre}
                            </Chip>
                        ))}
                    </div>
                    <div className="px-2 mt-4">
                        {/* Stats */}
                        <div className="px-2 flex justify-center items-start gap-3 sm:gap-5 md:gap-20">
                            {rutina &&
                                <>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-md md:text-xl">{calcularFecha(rutina.created_at)}</span>
                                        <span className="text-xs md:text-tiny">Creación</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-md md:text-xl">{rutina.sesiones}</span>
                                        <span className="text-xs md:text-tiny">Sesiones</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-md md:text-xl">{calcularDificultad()}<i className={`ri-fire-fill ${dificultadColor(calcularDificultad())}`}></i></span>
                                        <span className="text-xs md:text-tiny">Dificultad media</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="text-md md:text-xl">
                                            {rutina.ejercicios && rutina.ejercicios.length || 0}
                                        </span>
                                        <span className="text-xs md:text-tiny">Ejercicios</span>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                    <div className="mt-3">
                        <Button onClick={handleClick} className="mt-2" variant="solid" color="secondary" startContent={<i className="ri-play-large-fill text-primary"></i>}>Empezar entrenamiento</Button>
                    </div>
                </div>
                <CardEditDots
                    onOpen={onOpen}
                    delOnOpen={delOnOpen}
                    href={`/dashboard/rutinas/${rutina?.id}/edit`}
                />
            </div>

            <div className="w-full mt-3">
                <Tabs aria-label="Opciones" color="primary">
                    <Tab key="ejercicios" title="Ejercicios">
                        <div className="">
                            {rutina &&
                                <TablaEjerciciosSimple data={ejerciciosRutina} />
                            }
                        </div>
                    </Tab>
                    <Tab key="estadisticas" title="Estadisticas">
                        <div className="grid md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 gap-3">
                            {(sesionesRutina && sesionesRutina.length > 0) &&
                                sesionesRutina.map((item, index) => (
                                    <SesionCard key={index} sesion={item} />
                                ))
                                ||
                                <p><i className="ri-information-2-line text-primary text-lg me-2"></i>No tienes ninguna sesión de entrenamiento con esta rutina.</p>
                            }
                        </div>
                    </Tab>
                </Tabs>
            </div>

            {/* Modal para modificar */}
            <RutinaModalForm
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
                rutina={rutina}
            />

            {/* Modal para eliminar */}
            <RutinaModalDelete
                isOpen={delIsOpen}
                onClose={delOnClose}
                onOpenChange={delOnOpenChange}
                rutina={rutina}
            />

        </>
    )
}