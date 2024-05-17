'use client'

import { fetchEjerciciosRutina, fetchItem } from "@/app/lib/data";
import { UserContext } from "@/app/providers";
import { use, useEffect, useState } from "react"
import { Button, Image, CircularProgress, Input, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";

export default function Page({ params }) {
    const searchParams = useSearchParams()
    const idRutina = searchParams.get('rutina')

    const [rutina, setRutina] = useState(null)

    const user = use(UserContext)

    const [ejerciciosRutina, setEjerciciosRutina] = useState([]);

    const [ejercicioActual, setEjercicioActual] = useState(null);
    const [ejerciciosRestantes, setEjerciciosRestantes] = useState([]);

    const [isDescanso, setIsDescanso] = useState(false);
    const [tiempoDescanso, setTiempoDescanso] = useState(60);
    const [descanso, setDescanso] = useState(60);

    const [serieActual, setSerieActual] = useState(1);
    const [serieActualDatos, setSerieActualDatos] = useState(null);
    const [repeticionesSerie, setRepeticionesSerie] = useState(0);
    const [pesoSerie, setPesoSerie] = useState(0);
    const [rpeSerie, setRpeSerie] = useState(0);

    const [RPEMedia, setREPMedia] = useState(0)
    const [eficacia, setEficacia] = useState(0)
    const [rutinaProgreso, setRutinaProgreso] = useState(0)
    const [registroSesion, setRegistroSesion] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const fetchData = async () => {
        console.log(idRutina)
        const _rutina = await fetchItem(`usuarios/${user.id}/rutinas/${idRutina}`)
        setRutina(_rutina)
        console.log(_rutina)

        const _rutina_ejercicios = await fetchEjerciciosRutina(_rutina.ejercicios);
        setEjerciciosRutina(_rutina_ejercicios);
        console.log(_rutina_ejercicios)

        setEjercicioActual(_rutina_ejercicios[0]);
        setEjerciciosRestantes(
            _rutina_ejercicios.filter(item => item.orden > 0)
        )
    }

    const siguienteSerie = () => {
        setIsDescanso(true)

        setRepeticionesSerie(ejercicioActual.repeticiones)
        setRpeSerie(5)
        setPesoSerie(ejercicioActual.peso)
    }

    const guardarSerie = () => {
        let serie;
        if (serieActual == 1) {
            serie = {
                ...ejercicioActual,
                datosSesion: []
            }
        } else {
            serie = { ...serieActualDatos }
            console.log(serie)
        }

        serie.datosSesion.push({
            serie: parseInt(serieActual),
            repeticiones: parseInt(repeticionesSerie),
            peso: parseFloat(pesoSerie),
            rpe: parseInt(rpeSerie)
        })

        console.log(serie)

        setSerieActualDatos(serie)
    }

    const siguienteEjercicio = () => {
        /* Guardar las series del ejercicio actual en el registro de la sesion */
        setRegistroSesion([...registroSesion, serieActualDatos])
        console.log([...registroSesion, serieActualDatos]);
        /* Cambiar el ejercicio actual por el siguiente ejercicio en la lista */
        const nextEjercicio = ejerciciosRutina.find(item => item.orden > ejercicioActual.orden)

        /* Terminar la sesion */
        if (!nextEjercicio) {
            /* Guardar en la bd los datos de la sesion */
            /* Mostrar un modal con los datos de la sesion */
            /* En el modal tener un boton que redirija al usuario a la pagina de la rutina */
            setEjercicioActual(null)
            return
        }

        setEjercicioActual(nextEjercicio)
        setEjerciciosRestantes(
            ejerciciosRestantes.filter(item => item.orden > nextEjercicio.orden)
        )

    }

    const calcularMedia = () => {
        if (registroSesion.length == 0) {
            setREPMedia(0)
            setEficacia(0)
            return
        }
        
        let rpeTotal = 0;
        let eficaciaTotal = 0;
        let cantidad = 0;

        registroSesion.map(item => {
            item.datosSesion.map(serie => {
                const serieEficacia = serie.repeticiones / item.repeticiones * 100
                cantidad++
                rpeTotal += serie.rpe
                eficaciaTotal += serieEficacia >= 100 ? 100 : serieEficacia
            })
        })
        
        console.log('cantidad', cantidad)
        console.log('rpeTotal', rpeTotal)
        console.log('eficaciaTotal', eficaciaTotal)
        setREPMedia(cantidad == 0 ? 0 : rpeTotal / cantidad)
        setEficacia(cantidad == 0 ? 0 : eficaciaTotal / cantidad)
    }

    const calcularRutinaProgreso = () => {
        /* Obtener serias totales y series completadas */
        let seriesTotales = 0
        let seriesCompletadas = 0

        ejerciciosRutina.map(item => {
            seriesTotales += item.series
        })
        registroSesion.map(item => {
            seriesCompletadas += item.datosSesion.length
        })

        /* Calcular % */
        const progreso = (seriesTotales == 0 ? 0 : seriesCompletadas / seriesTotales) * 100
        console.log(seriesTotales, seriesCompletadas, progreso)
        setRutinaProgreso(progreso)
    }

    useEffect(() => {
        if (!user) return

        fetchData()

    }, [user])

    useEffect(() => {
        let timer;

        if (isDescanso && descanso > 0) {
            timer = setInterval(() => {
                setDescanso(prevTiempo => prevTiempo - 1)
            }, 1000)

        } else if (descanso <= 0) {
            /* Guardar datos serie */
            guardarSerie()
            calcularMedia()
            calcularRutinaProgreso()

            if (serieActual + 1 > ejercicioActual.series) {
                /* Siguiente ejercicio */
                setSerieActual(1)
                siguienteEjercicio()
            } else {
                setSerieActual(serie => serie + 1)
            }

            /* Parar descanso */
            setIsDescanso(false)
            setDescanso(tiempoDescanso)
        }

        return () => clearInterval(timer);

    }, [isDescanso, descanso])

    return (
        <div className="h-screen overflow-y-auto bg-dark/95">
            <div className="grid place-items-center text-white">
                <div className="w-full max-w-[1200px] flex flex-col justify-between items-center">
                    <div className="w-full flex justify-between p-5">
                        <p className="text-3xl bold">00:00:00</p>
                        <div className="flex gap-2 text-2xl">
                            <Button isIconOnly variant="light" startContent={<i className="ri-folder-video-fill text-2xl text-white"></i>}></Button>
                            <Button onPress={onOpen} isIconOnly color="danger" variant="flat" startContent={<i className="ri-close-line text-red-500 text-2xl"></i>}></Button>
                        </div>
                    </div>
                </div>
            </div>
            {ejercicioActual &&
                <div className="relative h-[70vh] w-full grid place-items-center text-white bg-dark">
                    {isDescanso &&
                        <div className="relative h-full grid place-items-center">
                            <div className="z-50 flex flex-col items-center gap-2">
                                <CircularProgress
                                    size="lg"
                                    value={descanso}
                                    maxValue={tiempoDescanso}
                                    valueLabel={<span>{descanso}</span>}
                                    showValueLabel
                                    strokeWidth={4}
                                    color="primary"
                                    classNames={{
                                        svg: "w-48 h-48 drop-shadow-md",
                                        indicator: "stroke-primary",
                                        track: "stroke-white/10",
                                        value: "text-[4rem] font-semibold text-white",
                                    }}
                                />
                                <div className="flex gap-10 justify-center">
                                    <Button onClick={() => setDescanso(prevTiempo => prevTiempo - 10)} variant="light" className="text-white">-10 seg</Button>
                                    <Button onClick={() => setDescanso(prevTiempo => prevTiempo + 10)} variant="light" className="text-white">+10 seg</Button>
                                </div>
                                <div className="mt-8 flex flex-col gap-3">
                                    <p className="text-xl"><i className="ri-questionnaire-line text-primary me-2"></i>Como te ha salido el ejercicio?</p>

                                    <div className="w-full flex items-center gap-3 bg-secondary p-2 shadow rounded-full">
                                        <Image
                                            width={50}
                                            height={50}
                                            alt={`Imagen del ejercicio ${ejercicioActual.ejercicio.nombre}`}
                                            src={ejercicioActual.ejercicio.imgPath ?? "/excercises/img-excercise1.png"}
                                            fallbackSrc={"/excercises/img-excercise1.png"}
                                            radius="full"
                                        />
                                        <p className="line-clamp-2">{ejercicioActual.ejercicio.nombre}</p>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <Input
                                            type="number"
                                            label={ejercicioActual.tipo == 'reps' ? 'Repeticiones' : 'Duración(s)'}
                                            min={0}
                                            value={repeticionesSerie}
                                            onValueChange={setRepeticionesSerie}
                                            defaultValue={ejercicioActual.repeticiones}
                                        />
                                        <div className="flex gap-3">
                                            <Input
                                                type="number"
                                                label="Peso kg"
                                                min={0}
                                                step={0.1}
                                                value={pesoSerie}
                                                onValueChange={setPesoSerie}
                                                defaultValue={ejercicioActual.peso}
                                            />
                                            <Input
                                                type="number"
                                                label="RPE (del 1 al 10)"
                                                min={1}
                                                max={10}
                                                value={rpeSerie}
                                                onValueChange={setRpeSerie}
                                                defaultValue={5}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div
                                style={{ height: `${descanso / 60 * 100}%`, transition: 'height is linear' }}
                                className="absolute bottom-0 bg-gradient-to-br from-primary/50 to-primary w-full"
                            ></div> */}
                        </div>
                        ||
                        <div className="px-5 h-full">
                            <div className="sm:h-full ">
                                <div className="w-fit grid place-items-center">
                                    <Image
                                        alt={`Imagen del ejercicio ${ejercicioActual.ejercicio.nombre}`}
                                        src={ejercicioActual.ejercicio.imgPath ?? "/excercises/img-excercise1.png"}
                                        fallbackSrc={"/excercises/img-excercise1.png"}
                                        className="absolute top-0 h-full mx-auto"
                                        radius="none"
                                        removeWrapper
                                    />
                                    <div className="z-50 absolute h-full w-full top-0 flex flex-col items-center justify-end bg-gradient-to-b from-transparent via-dark/80 via-70% to-dark to-90%">
                                        <div className="flex flex-col gap-3 md:gap-5">
                                            <p className="px-5"><span className="bg-white text-secondary rounded-full px-5 py-2 text-xl">Serie {serieActual}/{ejercicioActual.series}</span><span className="px-2 py-2 text-white">x<span className="text-2xl bold">{ejercicioActual.repeticiones}</span> {ejercicioActual.tipo == 'tiempo' && 'segs' || 'reps'}</span></p>
                                            <p className="text-xl text-gray-200 bold text-center">{ejercicioActual.ejercicio.nombre}</p>
                                            <Button onClick={siguienteSerie} className="mt-2 mb-5 bg-secondary shadow-lg text-white py-8 w-full uppercase" variant="flat" startContent={<i className="ri-check-line text-primary text-xl"></i>}>Continuar</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }

            <div className="w-full grid place-items-center mt-5">
                <div className="w-full max-w-[1200px] px-5 bg-dark rounded-xl shadow p-5">
                    <p className="w-full text-white py-5 px-8 uppercase">Siguientes ejercicios</p>
                    <div className="w-full flex flex-col gap-3 text-white">
                        {ejerciciosRestantes && ejerciciosRestantes.map(item => (
                            <div key={item.orden} className="w-full flex gap-5 bg-secondary p-3 shadow rounded-xl">
                                <Image
                                    width={100}
                                    height={100}
                                    alt={`Imagen del ejercicio ${item.ejercicio.nombre}`}
                                    src={item.ejercicio.imgPath ?? "/excercises/img-excercise1.png"}
                                    fallbackSrc={"/excercises/img-excercise1.png"}
                                    radius="lg"
                                />
                                <div className="flex flex-col justify-center">
                                    <p>{item.ejercicio.nombre}</p>
                                    <div className="flex gap-3 text-xl">
                                        <p>{item.series}x{item.repeticiones}{item.tipo == 'tiempo' && 'seg'}</p>
                                        {item.peso > 0 &&
                                            <p> · {item.peso}kg</p>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal fin de sesion */}
            <Modal
                size="full"
                isDismissable={false}
                /* hideCloseButton */
                isOpen={isOpen}
                onClose={onClose}
                className="bg-dark"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalBody>
                                <div className="w-full h-full grid place-items-center">
                                    <div className="">
                                        <div className="text-white flex flex-col items-center">
                                            <CircularProgress
                                                label="Rutina completada"
                                                size="lg"
                                                value={rutinaProgreso}
                                                maxValue={100}
                                                showValueLabel
                                                strokeWidth={4}
                                                color="primary"
                                                classNames={{
                                                    svg: "w-48 h-48 drop-shadow-md",
                                                    indicator: "stroke-primary",
                                                    track: "stroke-white/10",
                                                    value: "text-[2rem] font-semibold text-white",
                                                }}
                                            />
                                        </div>
                                        <div className="flex gap-3 mt-3">
                                            <div className="text-white flex flex-col items-center">
                                                <CircularProgress
                                                    label="Eficacia"
                                                    value={eficacia}
                                                    maxValue={100}
                                                    showValueLabel
                                                    strokeWidth={4}
                                                    color="primary"
                                                    classNames={{
                                                        svg: "w-24 h-24 drop-shadow-md",
                                                        indicator: "stroke-primary",
                                                        track: "stroke-white/10",
                                                        value: "text-lg font-semibold text-white",
                                                    }}
                                                />
                                            </div>
                                            <div className="text-white flex flex-col items-center">
                                                <CircularProgress
                                                    label="RPE medio"
                                                    value={RPEMedia}
                                                    maxValue={10}
                                                    showValueLabel
                                                    strokeWidth={4}
                                                    color="primary"
                                                    classNames={{
                                                        svg: "w-24 h-24 drop-shadow-md",
                                                        indicator: "stroke-primary",
                                                        track: "stroke-white/10",
                                                        value: "text-lg font-semibold text-white",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <Button className="w-full" color="success" variant="flat" size="lg">Terminar rutina</Button>
                                        </div>
                                    </div>
                                </div>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}