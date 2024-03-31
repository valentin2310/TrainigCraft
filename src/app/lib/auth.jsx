'use client'

import { auth } from "@/firebase/config";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence }  from "firebase/auth"
import { revalidatePath } from "next/cache";
import { useEffect, useState } from "react";

export async function googleSingIn() {

    await setPersistence(auth, browserLocalPersistence)

    const googleProvider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, googleProvider)

    console.log(result.user)

    revalidatePath('/')

}

export async function emailSignIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function signOutUser() {
    const result = await signOut(auth)
    console.log(result)
    return result
}

export function useUser() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => setUser(user))
    }, [])

    return user
}