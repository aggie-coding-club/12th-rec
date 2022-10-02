import create from 'zustand'
import { UserCredential } from 'firebase/auth';
import { IUser } from "../utils/interfaces";

interface AppState {
  userIsSignedIn: boolean
  setUserIsSignedIn: (userIsSignedIn: boolean) => void

  currentUser: IUser
  setCurrentUser: (newUser: IUser) => void
}

const useAppStore = create<AppState>()((set) => ({
  userIsSignedIn: false,
  setUserIsSignedIn: (userIsSignedIn) => set((state) => ({ userIsSignedIn: userIsSignedIn })),

  currentUser: { name: "", email: "", classification: "", uid: "", profilePicURL: null },
  setCurrentUser: (newUser) => set((state) => ({ currentUser: newUser })),
}))

export default useAppStore;