import { generarGradient } from "@/app/lib/utils"
import { Chip } from "@nextui-org/react"
import clsx from "clsx"

export default function RutinaCardSimple({ rutina, selected = false }) {
    return (
        <>
            <div className={clsx(
                "p-1 rounded-xl shadow text-secondary cursor-pointer h-full",
                { 'bg-primary' : selected }
            )}>
                <div className="p-4 w-full h-full flex flex-col justify-between bg-gradient-to-tr from-gray-100/90 to-gray-50/85 backdrop-blur rounded-xl">
                    <div className="">
                        <p className="text line-clamp-1">{rutina.titulo}</p>
                        <p className="text-sm line-clamp-2 text-secondary/90">{rutina.descripcion}</p>
                    </div>
                    <div className="flex overflow-x-auto gap-1 mt-3">
                        {rutina.categorias && rutina.categorias?.map((cat) => (
                            <Chip key={cat.nombre} size="sm" className="border-0" variant="bordered" startContent={<i className="ri-circle-fill" style={{ color: cat.color }}></i>}>
                                {cat.nombre}
                            </Chip>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}