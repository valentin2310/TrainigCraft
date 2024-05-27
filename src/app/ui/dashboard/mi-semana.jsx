import { Button } from "@nextui-org/react"

const semana = [
    {
        'dia': 'Lunes',
        'simbolo': 'L',
        'estado': false
    },
    {
        'dia': 'Martes',
        'simbolo': 'M',
        'estado': true
    },
    {
        'dia': 'Miércoles',
        'simbolo': 'X',
        'estado': false
    },
    {
        'dia': 'Jueves',
        'simbolo': 'J',
        'estado': true
    },
    {
        'dia': 'Viernes',
        'simbolo': 'V',
        'estado': true
    },
    {
        'dia': 'Sábado',
        'simbolo': 'S',
        'estado': false
    },
    {
        'dia': 'Domingo',
        'simbolo': 'D',
        'estado': false
    },
]

export default async function MiSemana() {
    return (
        <div className="misemana w-full">
            <div className="w-full flex justify-between items-center mb-2">
                <p className="text-lg xl:text-xl text-primary font-semibold"><i className="ri-calendar-schedule-line me-2"></i>Mi semana</p>
                <div className="flex gap-1 sm:gap-2">
                    <Button className="sm:hidden rounded-full" size="sm" variant="flat" color="primary" isIconOnly startContent={<i className="ri-edit-2-line"></i>} />

                    <Button className="hidden sm:flex" variant="flat" color="primary" startContent={<i className="ri-edit-2-line text-lg"></i>}>
                        <span>Editar</span>
                    </Button>
                </div>
            </div>

            <div className="w-full md:px-2 flex justify-evenly sm:gap-1 lg:gap-2 rounded bg-gradient-to-br from-gray-100 to-gray-50 sm:bg-none">
                {semana.map((dia) => {
                    const icon = dia.estado ? 'ri-checkbox-circle-line text-primary' : 'ri-checkbox-blank-circle-line'

                    return (
                        <div key={dia.simbolo} className="flex flex-col gap-0 items-center py-2 md:p-2 lg-p-4 w-full sm:bg-gradient-to-br from-gray-100 to-gray-50 text-secondary sm:rounded sm:shadow text-xs md:text-md">
                            <p className="hidden md:block">{dia.dia}</p>
                            <p className="md:hidden">{dia.simbolo}</p>
                            <i className={`${icon} text-sm md:text-xl lg:text-3xl`}></i>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}