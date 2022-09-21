import create from 'zustand'

interface AppState {
  userIsSignedIn: boolean
  setUserIsSignedIn: (userIsSignedIn: boolean) => void
}

const useAppStore = create<AppState>()((set) => ({
  userIsSignedIn: false,
  setUserIsSignedIn: (userIsSignedIn) => set((state) => ({ userIsSignedIn: userIsSignedIn })),
}))

export default useAppStore;