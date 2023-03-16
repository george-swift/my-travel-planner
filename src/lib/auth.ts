import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth'

import { defaultApp } from './config'
import { LoginCredentials } from './utils'

export const auth = getAuth(defaultApp)

export const login = async ({ email, password }: LoginCredentials) => {
  let data = null,
    error = null
  try {
    data = await signInWithEmailAndPassword(auth, email, password)
  } catch (e) {
    error = e
  }
  return { data, error }
}

export const logout = async () => {
  let error = null
  try {
    await signOut(auth)
  } catch (e) {
    error = e
  }

  return { error }
}
