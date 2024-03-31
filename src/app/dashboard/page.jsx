import MiSemana from "@/app/ui/dashboard/mi-semana";
import MisObjetivos from "@/app/ui/dashboard/mis-objetivos";
import { Input } from "@nextui-org/react";
import MisRutinas from "@/app/ui/dashboard/mis-rutinas";

export default function Page() {
    return (
        <div className="">
            <div className="buscador w-full bg-secondary text-white p-4 rounded">
                <Input
                    isClearable
                    radius="lg"
                    placeholder="Busca una rutina o ejercicio..."

                />
            </div>
            
            <div className="mt-5">
                <MiSemana />
            </div>

            <div className="mt-5">
                <MisObjetivos />
            </div>

            <div className="mt-5">
                <MisRutinas />
            </div>
        </div>
    )
}