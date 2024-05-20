import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"

const initialState = {
    rutina: null,
    ejerciciosRutina: [],
    ejercicioActual: null,
    ejerciciosRestantes: [],
    serieActual: 1,
    repeticionesSerie: 0,
    pesoSerie: 0,
    rpeSerie: 0,
    isDescanso: false,
    tiempoDescanso: 60,
    descanso: 60,
    RPEMedia: 0,
    eficacia: 0,
    rutinaProgreso: 0,
    registroSesion: [],
    duracion: 0
}

export const useSesionEntrenamiento = create(
    persist(
        (set, get) => ({
            ...initialState,

            setRutina: (newRutina) => set({ rutina: newRutina }),
            setEjerciciosRutina: (newList) => set({ ejerciciosRutina: newList }),
            
            setEjercicioActual: (newEjercicio) => set({ ejercicioActual: newEjercicio }),
            setEjerciciosRestantes: (newList) => set({ ejerciciosRestantes: newList }),
            
            setSerieActual: (newSerie) => set({ serieActual: newSerie }),
            setRepeticionesSerie: (newRepeticiones) => set({ repeticionesSerie: newRepeticiones }),
            setPesoSerie: (newPeso) => set({ pesoSerie: newPeso }),
            setRpeSerie: (newRpe) => set({ rpeSerie: newRpe }),
            
            setIsDescanso: (newDescanso) => set({ isDescanso: newDescanso }),
            setTiempoDescanso: (newTiempoDescanso) => set({ tiempoDescanso: newTiempoDescanso }),
            setDescanso: (newDescanso) => set({ descanso: newDescanso }),

            setRPEMedia: (newRpe) => set({ RPEMedia: newRpe }),
            setEficacia: (newEficacia) => set({ eficacia: newEficacia }),
            setRutinaProgreso: (newProgreso) => set({ rutinaProgreso: newProgreso }),

            setRegistroSesion: (newRegistro) => set({ registroSesion: newRegistro }),

            setDuracion: (newDuracion) => set({ duracion: newDuracion }),
            addDuracion: () => set({ duracion: get().duracion + 1 }),

            reset: () => {
                set(initialState)
            }
        }),
        {
            name: 'sesion-entrenamiento',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)