import { create } from "zustand";

export const useRutinas = create((set) => ({
    rutinas: [],
    setRutinas: (newList) => set({ rutinas: newList }),
    storeRutina: (newItem) => set((state) => ({
        rutinas: [
            { ...newItem },
            ...state.rutinas
        ]
    })),
    updateRutina: (newItem) => set((state) => ({
        rutinas: state.rutinas.map((obj) => {
            return obj.id == newItem.id ? { ...newItem } : obj
        })
    })),
    destroyRutina: (oldItem) => set((state) => ({
        rutinas: state.rutinas.filter((obj) => obj.id != oldItem.id)
    }))
}))