import { create } from "zustand";
import { fetchDefaultEjercicios } from "@/app/lib/data";

export const useEjercicios = create((set) => ({
    ejercicios: [],
    filteredEjercicios: [],
    default: [],
    setEjercicios: (newList) => set({ ejercicios: newList }),
    setFilteredEjercicios: (newList) => set({ filteredEjercicios: newList }),
    storeEjercicio: (newEjercicio) => {
        set((state) => ({
            ejercicios: [
                {
                    ...newEjercicio
                },
                ...state.ejercicios,
            ]
        }))
    },
    updateEjercicio: (newEjercicio) => {
        set((state) => ({
            ejercicios: state.ejercicios.map((obj) => {
                if (obj.id == newEjercicio.id) {
                    return {
                        ...newEjercicio
                    }
                } else {
                    return obj
                }
            })
        }))
    },
    destroyEjercicio: (oldEjercicio) => {
        set((state) => ({
            ejercicios: state.ejercicios.filter((obj) => obj.id != oldEjercicio.id)
        }))
    },
    getDefault: async () => {
        try {
            const data = await fetchDefaultEjercicios()
            set({ default: data })

        } catch(error) {
            console.log(error)
        }
    }
}))