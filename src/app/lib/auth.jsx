'use client'

import { auth } from "@/firebase/client-config";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence } from "firebase/auth"
import { addUsuarioFromLogin } from "@/app/lib/data";

export async function googleSingIn() {
    try {
        await setPersistence(auth, browserLocalPersistence)

        const googleProvider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, googleProvider)

        const idToken = await result.user.getIdToken();

        await fetch("/api/login", {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

        console.log(result.user)
        const user = await addUsuarioFromLogin(result.user)
        console.log(user)

        return result.user;

    } catch (error) {
        console.log(error)
    }
}

export async function emailSignIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
}

export async function signOutUser() {
    try {
        const result = await signOut(auth)
        console.log(result)
        
    } catch (error) {
        console.log(error)
    }
}