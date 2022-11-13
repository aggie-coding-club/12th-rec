import create from 'zustand'
import { UserCredential } from 'firebase/auth';
import { IPost, IUser } from "../utils/interfaces";

interface AppState {
  userIsSignedIn: boolean
  setUserIsSignedIn: (userIsSignedIn: boolean) => void

  currentUser: IUser
  setCurrentUser: (newUser: IUser) => void

  posts: IPost[]
  setPosts: (newPosts: IPost[]) => void
}

const useAppStore = create<AppState>()((set) => ({
  userIsSignedIn: false,
  setUserIsSignedIn: (userIsSignedIn) => set((state) => ({ userIsSignedIn: userIsSignedIn })),

  currentUser: { name: "", email: "", classification: "", uid: "", profilePicURL: null, posts: [] },
  setCurrentUser: (newUser) => set((state) => ({ currentUser: newUser })),

  posts: [],
  setPosts: (newPosts) => set((state) => ({ posts: [...state.posts, ...newPosts] }))
}))

export default useAppStore;