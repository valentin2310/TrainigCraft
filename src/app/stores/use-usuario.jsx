import { create } from "zustand"

export const useUsuario = create((set) => ({
    user: null,
    updateUsuario: (newUser) => ({ user: newUser })
}))