import { calcularFecha, formatSecondsToTime } from "@/app/lib/utils"
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Image, Accordion, AccordionItem } from "@nextui-org/react"
import clsx from "clsx"

export default function ModalSesionInfo({ sesion, isOpen, onOpen, onOpenChange }) {
    return (
        <>
            <Modal className="z-50" isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="bg-secondary">
                                <i className="ri-history-line text-white text-xl me-2"></i>
                                <p className="font-bold text-white">Sesión de entrenamiento.</p>
                            </ModalHeader>
                            <ModalBody className="max-h-[500px] overflow-y-auto">
                                <div className="">
                                    <p>Rutina: <span className="font-bold">{sesion.datosRutina.titulo}</span></p>
                                    <p>Estado: <span className="font-bold">{sesion.completado ? 'Completado' : 'Sin completar'}</span></p>
                                    <p>Completada al <span className={clsx(
                                        "font-bold",
                                        { "text-primary": sesion.completado },
                                        { "text-red-500": !sesion.completado },
                                    )}>{sesion.progreso}</span>%</p>
                                </div>
                                Resumen:
                                <div className="grid grid-cols-2 xl:grid-cols-4 text-sm gap-2">
                                    <div className="p-1 md:p-2 bg-dark/5 rounded shadow w-full text-center flex flex-col-reverse">
                                        <i className="font-semibold">Día</i>
                                        {calcularFecha(sesion?.created_at)}
                                    </div>
                                    <div className="p-1 md:p-2 bg-dark/5 rounded shadow w-full text-center flex flex-col-reverse">
                                        <i className="font-semibold">Duración</i>
                                        {formatSecondsToTime(sesion.duracion)}
                                    </div>
                                    <div className="p-1 md:p-2 bg-dark/5 rounded shadow w-full text-center flex flex-col-reverse">
                                        <i className="font-semibold">Eficacia</i>
                                        {Math.round(sesion.eficacia).toFixed(0)}%
                                    </div>
                                    <div className="p-1 md:p-2 bg-dark/5 rounded shadow w-full text-center flex flex-col-reverse">
                                        <i className="font-semibold">RPE</i>
                                        {Math.round(sesion.rpe).toFixed(1)}
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <p className="mb-2">Datos sesión:</p>
                                    {(sesion.registro && sesion.registro.length > 0) &&
                                        (
                                            <Accordion selectionMode="multiple" variant="splitted">
                                                {
                                                    sesion.registro.map(item => (
                                                        <AccordionItem key={item.orden} aria-label={item.ejercicio.nombre} title={
                                                            <>
                                                                <div className="flex gap-5">
                                                                    <Image
                                                                        width={50}
                                                                        height={50}
                                                                        alt={`Imagen del ejercicio ${item.ejercicio.nombre}`}
                                                                        src={item.ejercicio.imgPath ?? "/excercises/img-excercise1.png"}
                                                                        fallbackSrc={"/excercises/img-excercise1.png"}
                                                                        radius="lg"
                                                                    />
                                                                    <div className="flex flex-col justify-center">
                                                                        <p className="text-sm">{item.ejercicio.nombre}</p>
                                                                        <div className="flex gap-3 text-sm">
                                                                            <p>{item.series}x{item.repeticiones}{item.tipo == 'tiempo' && 'seg'}</p>
                                                                            {item.peso > 0 &&
                                                                                <p> · {item.peso}kg</p>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }>
                                                            <div className="flex flex-col gap-2">
                                                                {item.datosSesion.map((serie, index) => (
                                                                    <div key={item.orden + "-" + index} className="bg-gray-100 p-2 rounded-xl shadow">
                                                                        <div className="flex flex-wrap gap-2">
                                                                            <p className="font-bold">Serie {serie.serie}:</p>
                                                                            <div className="flex gap-1">
                                                                                <p>{serie.repeticiones} {item.tipo == "reps" ? "repeticiones" : "segundos"}</p>
                                                                                <p>{serie.peso == 0 ? "" : serie.peso + " kg"}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-sm flex gap-3">
                                                                            <p>Eficacia: <span>{serie.eficacia.toFixed(0)}%</span></p>
                                                                            <p>RPE: <span>{serie.rpe.toFixed(2)}</span></p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </AccordionItem>
                                                    ))
                                                }
                                            </Accordion>
                                        )
                                    }
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="default" variant="flat" onPress={onClose}>Cerrar</Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
}