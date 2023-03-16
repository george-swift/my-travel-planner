'use client'

import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren
} from 'react'
import {
  getAuth,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth'

import { Icon } from '@/components'

import { defaultApp } from '@/lib/config'

const auth = getAuth(defaultApp)

const AuthContext = createContext<{
  user: FirebaseUser | null
}>({ user: null })

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<FirebaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) setUser(user)
      else setUser(null)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? (
        <div
          className="w-screen h-screen flex items-center justify-center"
          role="status"
        >
          <Icon name="spinner" />
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}
