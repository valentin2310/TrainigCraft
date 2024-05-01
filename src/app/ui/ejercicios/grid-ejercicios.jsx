import { Chip } from '@nextui-org/react'
import EjercicioCard from '@/app/ui/ejercicios/ejercicio-card'

export default function GridEjercicios({ lista }) {
    return (
        <div className="grid md:grid-cols-3 2xl:grid-cols-5 gap-3">
            {lista?.length > 0 && lista.map((ej) => (
                <EjercicioCard key={ej.id} ejercicio={ej} />
            ))}
        </div>
    )
}