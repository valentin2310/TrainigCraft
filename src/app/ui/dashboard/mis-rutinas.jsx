import { fetchUserRutinas } from "@/app/lib/data"
import RutinaCard from "@/app/ui/rutina-card"
import Button from "@/app/ui/Button";

export default async function MisRutinas() {
    const rutinas = await fetchUserRutinas();

    return (
        <>
            <div className="w-full flex justify-between">
                <p>Mis rutinas</p>
                <div className="">
                    <Button>
                        <i className="ri-edit-2-line m-2"></i><span className="hidden sm:inline">Editar</span>
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
                {rutinas && rutinas.map((rutina) => {
                    return (
                        <RutinaCard key={rutina.id} rutina={rutina} />
                    )
                })}
            </div>
        </>
    )
}