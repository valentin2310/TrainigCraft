// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { createContext, useEffect, useState } from 'react'
import { getUser } from '@/app/lib/data'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/client-config'
import { useUsuario } from '@/app/stores/use-usuario'

export const UserContext = createContext()

export function Providers({children}) {
  const [user, setUser] = useState(null)
  const { setUsuario } = useUsuario()

  useEffect(() => {
      const observer = onAuthStateChanged(auth, async (user) => {
          const appUser = await getUser(user?.uid)
          if (!appUser) {
            setUser(null)
            return
          }

          setUser(appUser)
          setUsuario(appUser)
      })

      return () => {
        observer()
      }
  }, [])

  return (
    <UserContext.Provider value={user}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </UserContext.Provider>
  )
}