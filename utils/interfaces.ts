export interface IUser {
    name: string
    classification: string
    email: string
    uid: string
    profilePicURL: string | null
}

export interface IPost {
    title: string,
    location: string,
    time: string
    description: string,
    userID: string
}