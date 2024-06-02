'use client'

import { use, useEffect, useState } from "react"
import { UserContext } from "@/app/providers"
import { Button } from "@nextui-org/react"
import { useObjetivos } from "@/app/stores/use-objetivos"
import CardEstadisticas from "@/app/ui/estadisticas/card-estadisticas"
import CardEstadistica from "@/app/ui/estadisticas/card-estadistica"
import { fetchObjetivos, fetchRutinas } from "@/app/lib/data"
import RutinaCardSimple from "@/app/ui/rutinas/rutina-card-simple"

export default function MisEstadisticas({ idUser }) {
    const user = use(UserContext)
    const [datosObjetivos, setDatosObjetivos] = useState({
        total: 0,
        completado: 0,
        dificultadMedia: 0
    })
    const [datosEntrenamiento, setDatosEntrenamiento] = useState({
        rutinas: 0,
        sesiones: 0,
        rutinaMasUsada: null
    })

    const getDatosObjetivos = async () => {
        const _objetivos = await fetchObjetivos(idUser)
        const objetivosCompletados = _objetivos.filter(item => item.completado).length
        const cantidadObjetivos = _objetivos.length
        const dificultadMedia = _objetivos.reduce(function (total, item) {
            return total + item.dificultad
        }, 0) / cantidadObjetivos

        setDatosObjetivos({
            total: cantidadObjetivos,
            completado: objetivosCompletados,
            dificultadMedia: dificultadMedia.toFixed(2)
        })
    }

    const getDatosEntrenamiento = async () => {
        const _rutinas = await fetchRutinas(idUser);
        const cantidad = _rutinas.length
        const sesiones = _rutinas.reduce(function (total, item) {
            return total + item.sesiones
        }, 0)
        const rutinaMasUsada = _rutinas.reduce(function (maximo, item) {
            if (!maximo) return maximo = item;

            if (item.sesiones > maximo.sesiones) return item;

            return maximo;

        }, null)

        setDatosEntrenamiento({
            rutinas: cantidad,
            sesiones: sesiones,
            rutinaMasUsada: rutinaMasUsada
        })
    }

    const fetchData = async () => {
        getDatosObjetivos()
        getDatosEntrenamiento()
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    return (
        <>
            <div className="w-full flex justify-between items-center my-2">
                {/* <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-focus-2-line me-2"></i>Mis objetivos</p> */}
                <p className="text-lg xl:text-xl text-primary font-semibold">ESTADÍSTICAS GENERALES</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
                <CardEstadisticas title="Objetivos">
                    <CardEstadistica title="Total" display={datosObjetivos.total} />
                    <CardEstadistica title="Completado" display={datosObjetivos.completado} />
                    <CardEstadistica title="Dificultad media" display={datosObjetivos.dificultadMedia} />
                </CardEstadisticas>

                <CardEstadisticas title="Entrenamientos">
                    <CardEstadistica title="Rutinas" display={datosEntrenamiento.rutinas} />
                    <CardEstadistica title="Sesiones" display={datosEntrenamiento.sesiones} />
                </CardEstadisticas>

                <CardEstadisticas title="Rutina más usada">
                    {datosEntrenamiento?.rutinaMasUsada &&
                        <CardEstadistica
                            display={<RutinaCardSimple rutina={datosEntrenamiento.rutinaMasUsada} />}
                        />
                    }
                </CardEstadisticas>

            </div>

        </>
    )
}