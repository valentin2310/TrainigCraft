import { create } from "zustand";
import { fetchMusculos } from "@/app/lib/data";

export const useMusculos = create((set) => ({
    musculos: [],
    getDefault: async () => {
        try {
            const data = await fetchMusculos()
            console.log(data)
            set({ musculos: data })

        } catch(error) {
            console.log(error)
        }
    }
}))