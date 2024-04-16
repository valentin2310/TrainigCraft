import { create } from "zustand"

export const useUsuario = create((set) => ({
    user: null,
    setUsuario: (newUser) => ({ user: newUser })
}))