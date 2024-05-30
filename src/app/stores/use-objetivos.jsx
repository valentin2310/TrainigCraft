import { create } from "zustand"
import { fetchObjetivos } from "@/app/lib/data"

export const useObjetivos = create((set) => ({
    objetivos: [],
    cant: 10,
    updateCant: (newCant) => set({ cant: newCant }),
    setObjetivos: (newList) => set({ objetivos: newList }),
    storeObjetivo: (newObjetivo) => {
        set((state) => ({
            objetivos: [
                {
                    ...newObjetivo
                },
                ...state.objetivos,
            ]
        }))
    },
    updateObjetivo: (newObjetivo) => {
        set((state) => ({
            objetivos: state.objetivos.map((obj) => {
                if (obj.id == newObjetivo.id) {
                    return {
                        ...newObjetivo
                    }
                } else {
                    return obj
                }
            })
        }))
    },
    destroyObjetivo: (oldObjetivo) => {
        set((state) => ({
            objetivos: state.objetivos.filter((obj) => obj.id != oldObjetivo.id)
        }))
    },
    updateObjetivos: async (user, cantidad) => {
        try {
            const data = await fetchObjetivos(user, cantidad)
            set({ objetivos: data })

        } catch (error) {
            console.error(error)
        }
    }
}))