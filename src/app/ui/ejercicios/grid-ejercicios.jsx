import { Chip } from '@nextui-org/react'

export default function GridEjercicios({ lista }) {
    return (
        <div className="grid grid-cols-5 gap-3">
            {lista?.length > 0 && lista.map((ej) => (
                <div key={ej.id} className="bg-gray-100 shadow rounded-xl p-4">
                    <p className="text-md font-bold line-clamp-2 mb-2">{ej.nombre}</p>
                    <p className="mb-2 text-small">
                        <span className="line-clamp-3">{ej.descripcion}</span>
                    </p>
                    {ej.musculos &&
                        <div className="flex flex-wrap gap-3">
                            {ej.musculos.map((musculo) => (
                                <Chip key={musculo} size="sm" color="primary" variant="dot">
                                    {musculo}
                                </Chip>
                            ))}
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}