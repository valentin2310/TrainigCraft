import { create } from "zustand";

export const usecategorias = create((set) => ({
    categorias: [],
    setCategorias: (newList) => set({ categorias: newList }),
    storeCategoria: (newItem) => set((state) => ({
        categorias: [
            { ...newItem },
            ...state.categorias
        ]
    })),
    updateCategoria: (newItem) => set((state) => ({
        categorias: state.categorias.map((obj) => {
            return obj.id == newItem.id ? { ...newItem } : obj
        })
    })),
    destroyCategoria: (oldItem) => set((state) => ({
        categorias: state.categorias.filter((obj) => obj.id != oldItem.id)
    }))
}))