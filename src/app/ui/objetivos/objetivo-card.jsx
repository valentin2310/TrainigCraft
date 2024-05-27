import { Rate } from "rsuite"
import clsx from "clsx"
import { renderRateCharacter, dificultadColor } from "@/app/lib/utils"
import { useDisclosure } from '@nextui-org/react'
import ObjetivoModalForm from "@/app/ui/objetivos/modal-form"
import ObjetivoModalDelete from "@/app/ui/objetivos/modal-delete"
import CardEditDots from "@/app/ui/card-edit-dots"

export default function ObjetivoCard({ objetivo }) {
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure()
    const {isOpen : delIsOpen, onOpen : delOnOpen, onClose : delOnClose, onOpenChange : delOnOpenChange} = useDisclosure()

    return (
        <>
        <div className={clsx(
            "w-full h-full bg-gradient-to-tl from-gray-50 to-gray-100 text-secondary p-2 md:p-4 rounded-xl shadow flex justify-between gap-3",
            {
                'border-primary': objetivo.fecha_completado != null,
            }
        )}>
            <div className="flex gap-1 md:gap-3 xl:gap-5">
                <div className={clsx(
                    'text-2xl md:text-3xl xl:text-5xl',
                    {
                        'text-amber-700' : objetivo.importancia <= 1,
                        'text-slate-400' : objetivo.importancia == 2,
                        'text-yellow-500' : objetivo.importancia >= 3,
                    },
                    {
                        'text-opacity-20' : objetivo.fecha_completado == null
                    }
                )}>
                    <i className="ri-medal-line"></i>
                </div>
                <div className="">
                    <div className="flex gap-2">
                        <p className={`md:text-lg  xl:text-xl ${dificultadColor(objetivo.dificultad)}`}>{objetivo.titulo}</p>
                        {/* <Rate allowHalf defaultValue={objetivo.dificultad} readOnly size="xs"  renderCharacter={renderRateCharacter} /> */}
                        {/* <i className={`ri-fire-fill text-xl ${dificultadColor(objetivo.dificultad)}`}></i> */}
                    </div>
                    <p className="text-sm md:text-md line-clamp-2 text-secondary/90">{objetivo.descripcion ? objetivo.descripcion : 'Sin descripción.'}</p>
                </div>
            </div>
            <CardEditDots 
                onOpen={onOpen}
                delOnOpen={delOnOpen}
            />
        </div>
            
            {/* Modal para modificar el objetivo */}
            <ObjetivoModalForm 
                objetivo={objetivo}
                isOpen={isOpen}
                onClose={onClose}
                onOpenChange={onOpenChange}
            />

            {/* Modal para confirmar la eliminación del objetivo */}
            <ObjetivoModalDelete 
                objetivo={objetivo}
                isOpen={delIsOpen}
                onClose={delOnClose}
                onOpenChange={delOnOpenChange}
            />
        </>
    )
}