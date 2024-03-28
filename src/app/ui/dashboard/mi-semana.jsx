import Button from "@/app/ui/Button"

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

export default function MiSemana() {
    return (
        <div className="misemana w-full bg-secondary border-2 border-secondary shadow-lg rounded p-4">
            <div className="w-full flex items-center justify-between mb-4 px-2 text-white">
                <p className="text-xl font-bold"><i className="ri-calendar-schedule-line me-2"></i>Mi semana</p>
                <Button>
                    <i className="ri-edit-2-line m-2"></i><span className="hidden sm:inline">Editar</span>
                </Button>
            </div>
            <div className="w-full md:p-2 flex justify-evenly gap-1 lg:gap-3 rounded">
                {semana.map((dia) => {
                    const icon = dia.estado ? 'ri-checkbox-circle-line text-primary' : 'ri-checkbox-blank-circle-line'

                    return (
                        <div key={dia.simbolo} className="flex flex-col gap-2 items-center py-2 md:p-2 lg-p-4 w-full bg-dark/50 text-white rounded shadow text-xs md:text-md">
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