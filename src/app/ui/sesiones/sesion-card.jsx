import clsx from "clsx";
import { formatSecondsToTime, calcularFecha } from "@/app/lib/utils";
import { Button } from "@nextui-org/react";

export default function SesionCard({ sesion }) {
    return (
        <>
            <div className="p-3 bg-gradient-to-tl from-gray-50 to-gray-100 rounded shadow">
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2 text-lg">
                        <i className="ri-history-line text-xl"></i>
                        <p className={clsx(
                            "text-medium",
                            { "text-primary": sesion.completado },
                            { "text-red-500": !sesion.completado },
                        )}>{Math.round(sesion.progreso)}%</p>
                        <p className="font-semibold">{sesion.datosRutina.titulo}</p>
                    </div>
                    <div className="">
                        <Button variant="light" size="sm" color="primary" isIconOnly startContent={<i className="ri-eye-line text-lg"></i>} className="p-1" />
                    </div>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-4 text-sm gap-2">
                    <div className="p-1 md:p-2 bg-dark/5 rounded shadow w-full text-center flex flex-col-reverse">
                        <i className="font-semibold ri-calendar-line"></i>
                        {calcularFecha(sesion?.created_at)}
                    </div>
                    <div className="p-1 md:p-2 bg-dark/5 rounded shadow w-full text-center flex flex-col-reverse">
                        <i className="font-semibold ri-timer-line"></i>
                        {formatSecondsToTime(sesion.duracion)}
                    </div>
                    <div className="p-1 md:p-2 bg-dark/5 rounded shadow w-full text-center flex flex-col-reverse">
                        <i className="font-semibold ri-line-chart-line"></i>
                        {Math.round(sesion.eficacia).toFixed(0)}%
                    </div>
                    <div className="p-1 md:p-2 bg-dark/5 rounded shadow w-full text-center flex flex-col-reverse">
                        <i className="font-semibold">RPE</i>
                        {Math.round(sesion.rpe).toFixed(1)}
                    </div>
                </div>
            </div>
        </>
    )
}