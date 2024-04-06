import ObjetivoCard from "@/app/ui/objetivos/ObjetivoCard"

export default function GridObjetivos({ lista }) {
    return (
        <>
            <div className="mt-3 grid grid-rows-2 grid-flow-col overflow-x-auto gap-2">
                {lista && lista.map((objetivo) => (
                    <ObjetivoCard key={objetivo.id} objetivo={objetivo} />
                ))}
            </div>
        </>
    )
}