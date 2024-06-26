import { create } from "zustand";

export const useRutinas = create((set) => ({
    rutinas: [],
    filteredRutinas: [],
    setRutinas: (newList) => set({ rutinas: newList }),
    setFilteredRutinas: (newList) => set({ filteredRutinas: newList }),
    storeRutina: (newItem) => set((state) => ({
        rutinas: [
            { ...newItem },
            ...state.rutinas
        ],
        filteredRutinas: [
            { ...newItem },
            ...state.filteredRutinas
        ]
    })),
    updateRutina: (newItem) => set((state) => ({
        rutinas: state.rutinas.map((obj) => {
            return obj.id == newItem.id ? { ...newItem } : obj
        }),
        filteredRutinas: state.filteredRutinas.map((obj) => {
            return obj.id == newItem.id ? { ...newItem } : obj
        }),
    })),
    destroyRutina: (oldItem) => set((state) => ({
        rutinas: state.rutinas.filter((obj) => obj.id != oldItem.id),
        filteredRutinas: state.filteredRutinas.filter((obj) => obj.id != oldItem.id),
    }))
}))