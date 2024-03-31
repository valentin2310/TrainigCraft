// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import { createContext } from 'react'
import { useUser } from './lib/auth'

export const UserContext = createContext()

export function Providers({children}) {
  const user = useUser()

  return (
    <UserContext.Provider value={user}>
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </UserContext.Provider>
  )
}