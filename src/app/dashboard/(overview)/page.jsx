import MiSemana from "@/app/ui/dashboard/mi-semana";
import MisObjetivos from "@/app/ui/dashboard/mis-objetivos";
import { Input } from "@nextui-org/react";
import MisRutinas from "@/app/ui/dashboard/mis-rutinas";
import { Suspense } from "react";
import { MisObjetivosSkeleton } from "@/app/ui/skeletons";

export default function Page() {
    return (
        <div className="">
            <div className="mt-0">
                <MiSemana />
            </div>

            <div className="mt-12">
                <Suspense fallback={<MisObjetivosSkeleton />}>
                    <MisObjetivos nObjetivos={8} />
                </Suspense>
            </div>

            <div className="mt-12">
                <MisRutinas />
            </div>
        </div>
    )
}