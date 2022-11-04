export interface IUser {
    name: string
    classification: string
    email: string
    uid: string
    profilePicURL: string | null
    posts: string[]
}

export interface IPost {
    title: string,
    location: string,
    coordinates: string
    dateTime: string
    description: string,
    userID: string
}