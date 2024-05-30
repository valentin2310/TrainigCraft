import ObjetivoCard from "@/app/ui/objetivos/objetivo-card"

export default function GridObjetivos({ lista }) {
    return (
        <>
            <div className="grid grid-cols-3 gap-3" >
                {lista && lista.map((objetivo) => (
                    <ObjetivoCard key={objetivo.id} objetivo={objetivo} />
                ))}
                {(!lista || lista.legth <= 0) &&
                    (
                        <p className="text-sm italic px-2"><i className="ri-information-2-line text-primary me-2"></i>No tienes ningún objetivo</p>
                    )
                }
            </div>
        </>
    )
}