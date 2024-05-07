import { create } from "zustand";
import { fetchDefaultEjercicios } from "@/app/lib/data";

export const useEjercicios = create((set) => ({
    ejercicios: [],
    filteredEjercicios: [],
    default: [],
    setEjercicios: (newList) => set({ ejercicios: newList }),
    setFilteredEjercicios: (newList) => set({ filteredEjercicios: newList }),
    storeEjercicio: (newEjercicio) => set((state) => ({
        ejercicios: [
            {
                ...newEjercicio
            },
            ...state.ejercicios,
        ],
        filteredEjercicios: [
            {
                ...newEjercicio
            },
            ...state.filteredEjercicios,
        ],
    })),
    updateEjercicio: (newEjercicio) => set((state) => ({
        ejercicios: state.ejercicios.map((obj) => {
            return obj.id == newEjercicio.id ? {...newEjercicio} : obj
        }),
        filteredEjercicios: state.filteredEjercicios.map((obj) => {
            return obj.id == newEjercicio.id ? {...newEjercicio} : obj
        }),
    })),
    destroyEjercicio: (oldEjercicio) => {
        set((state) => ({
            ejercicios: state.ejercicios.filter((obj) => obj.id != oldEjercicio.id),
            filteredEjercicios: state.filteredEjercicios.filter((obj) => obj.id != oldEjercicio.id),
        }))
    },
    getDefault: async () => {
        try {
            const data = await fetchDefaultEjercicios()
            set({ default: data })

        } catch (error) {
            console.log(error)
        }
    }
}))