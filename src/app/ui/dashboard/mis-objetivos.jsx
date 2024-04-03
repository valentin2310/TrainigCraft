'use client'

import { Rate } from "rsuite"
import clsx from "clsx"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "@/app/providers"
import { fetchUserObjetivos } from "@/app/lib/data"
import { Button, Tooltip } from "@nextui-org/react"

const renderCharacter = (value, index) => {
    if (value < index + 1) {
        return <i className="ri-fire-fill text-white"></i>
    }
    if (value <= 2) {
        return <i className="ri-fire-fill text-blue-500"></i>
    }

    if (value == 3) {
        return <i className="ri-fire-fill text-green-500"></i>
    }

    return <i className="ri-fire-fill text-red-500"></i>
}

export default function MisObjetivos() {
    const user = useContext(UserContext)
    const [objetivos, setObjetivos] = useState([])

    useEffect(() => {
        if (!user) return

        fetchUserObjetivos(user.id)
            .then((data) => setObjetivos(data))
            .catch((error) => console.log(error))
        
    }, [user])

    return (
        <>
            <p className="text-xl text-primary font-semibold mb-3">Mis objetivos</p>
            
            <div className="grid grid-cols-2 gap-3">
                {objetivos && objetivos.map((obj) => (
                    <>
                        <div className="bg-secondary text-white p-4 rounded shadow flex justify-between gap-3">
                            <div className="flex gap-5">
                                {obj.completado ? 
                                    <i className="ri-checkbox-circle-line text-xl text-primary"></i>
                                    :
                                    <i className="ri-hourglass-fill text-xl text-white"></i>
                                }
                                <div className="">
                                    <div className="flex gap-3 items-baseline">
                                        <p className="text-xl">{obj.titulo}</p>
                                        <Rate allowHalf defaultValue={obj.dificultad / 2} readOnly size="xs"  renderCharacter={renderCharacter} />
                                    </div>
                                    <p className="line-clamp-2 text-gray-300">{obj.descripcion}</p>
                                </div>
                            </div>
                            <div className={clsx(
                                'text-5xl',
                                {
                                    'text-amber-700' : obj.importancia <= 1,
                                    'text-slate-400' : obj.importancia == 2,
                                    'text-yellow-500' : obj.importancia >= 3,
                                }
                            )}>
                                <i className="ri-medal-line"></i>
                            </div>
                        </div>
                    </>
                ))

                }
            </div>
        </>
    )
}