import { Rate } from "rsuite"
import clsx from "clsx"
import { renderRateCharacter } from "@/app/lib/utils"

export default function objetivoetivoCard({ objetivo }) {
    return (
        <div className="bg-gradient-to-br from-secondary to-secondary/90 text-white p-4 rounded-xl shadow  border-b-4 border-dark flex justify-between gap-3">
            <div className="flex gap-5">
                <div className={clsx(
                    'text-5xl',
                    {
                        'text-amber-700' : objetivo.importancia <= 1,
                        'text-slate-400' : objetivo.importancia == 2,
                        'text-yellow-500' : objetivo.importancia >= 3,
                    }
                )}>
                    <i className="ri-medal-line"></i>
                </div>
                <div className="">
                    <div className="flex gap-3 items-baseline">
                        <p className="text-xl">{objetivo.titulo}</p>
                        <Rate allowHalf defaultValue={objetivo.dificultad} readOnly size="xs"  renderCharacter={renderRateCharacter} />
                    </div>
                    <p className="line-clamp-2 text-gray-300">{objetivo.descripcion ? objetivo.descripcion : 'Sin descripción.'}</p>
                </div>
            </div>
            {objetivo.fecha_completado ? 
                <i className="ri-checkbox-circle-line text-xl text-primary"></i>
                :
                <i className="ri-hourglass-fill text-xl text-white"></i>
            }
            
        </div>
    )
}