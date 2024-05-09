import ObjetivoCard from "@/app/ui/objetivos/objetivo-card"

export default function GridObjetivos({ lista }) {
    return (
        <>
            <div className="grid grid-rows-1 grid-flow-col overflow-x-auto gap-2">
                {lista && lista.map((objetivo) => (
                    <ObjetivoCard key={objetivo.id} objetivo={objetivo} />
                ))}
            </div>
        </>
    )
}