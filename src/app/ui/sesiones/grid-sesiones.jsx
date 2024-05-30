import SesionCard from "@/app/ui/sesiones/sesion-card"

export default function GridSesiones({ lista }) {
    return (
        <>
            <div className="grid sm:grid-cols-2 2xl:grid-cols-3 gap-3" >
                {lista && lista.map((sesion) => (
                    <SesionCard key={sesion.id} sesion={sesion} />
                ))}
                {(!lista || lista.legth <= 0) &&
                    (
                        <p className="text-sm italic px-2"><i className="ri-information-2-line text-primary me-2"></i>No tienes ninguna sesion de enternamiento.</p>
                    )
                }
            </div>
        </>
    )
}