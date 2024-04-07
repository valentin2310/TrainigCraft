import { create } from "zustand";
import { fetchDefaultEjercicios } from "@/app/lib/data";

export const useEjercicios = create((set) => ({
    ejercicios: [],
    default: [],
    setEjercicios: (newList) => set({ ejercicios: newList }),
    getDefault: async () => {
        try {
            const data = await fetchDefaultEjercicios()
            set({ default: data })

        } catch(error) {
            console.log(error)
        }
    }
}))