import MiSemana from "@/app/ui/dashboard/mi-semana";
import MisObjetivos from "../ui/dashboard/mis-objetivos";

export default function Page() {
    return (
        <div className="">
            <div className="buscador w-full bg-secondary text-white p-4 rounded">
                Buscador
            </div>
            
            <div className="mt-5">
                <MiSemana />
            </div>

            <div className="mt-5">
                <MisObjetivos />
            </div>
        </div>
    )
}