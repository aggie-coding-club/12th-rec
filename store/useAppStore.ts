import create from 'zustand'

interface AppState {
  isSignedIn: boolean
  setIsSignedIn: (isSignedIn: boolean) => void
}

const useAppStore = create<AppState>()((set) => ({
  isSignedIn: false,
  setIsSignedIn: (isSignedIn) => set((state) => ({ isSignedIn })),
}))

export default useAppStore;