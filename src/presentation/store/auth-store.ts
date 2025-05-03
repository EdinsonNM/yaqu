import { create } from 'zustand'
import { persist } from 'zustand/middleware';

import { UserSession } from '../../domain/authentication/models/user-session'
export type AuthState = {
  userSession: UserSession | null
  setUserSession: (session: UserSession) => void
  removeUserSession: () => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userSession: null,
      setUserSession: (session: UserSession) => set({ userSession: session }),
      removeUserSession: () => set({ userSession: null }),
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading: isLoading }),
    }),
    { name: 'auth' },
  ),
)

export default useAuthStore