import { create } from "zustand";

export const useSesionesEntrenamiento = create((set) => ({
    sesiones: [],
    filteredSesiones: [],
    setSesiones: (newList) => set({ sesiones: newList }),
    setFilteredSesiones: (newList) => set({ filteredSesiones: newList }),
    storeSesion: (newItem) => set((state) => ({
        sesiones: [
            { ...newItem },
            ...state.sesiones
        ],
        filteredSesiones: [
            { ...newItem },
            ...state.filteredSesiones
        ]
    })),
    updateSesion: (newItem) => set((state) => ({
        sesiones: state.sesiones.map((obj) => {
            return obj.id == newItem.id ? { ...newItem } : obj
        }),
        filteredSesiones: state.filteredSesiones.map((obj) => {
            return obj.id == newItem.id ? { ...newItem } : obj
        }),
    })),
    destroySesion: (oldItem) => set((state) => ({
        sesiones: state.sesiones.filter((obj) => obj.id != oldItem.id),
        filteredSesiones: state.filteredSesiones.filter((obj) => obj.id != oldItem.id),
    }))
}))