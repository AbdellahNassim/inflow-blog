import { DocumentData,DocumentReference} from "firebase/firestore"
export interface User extends DocumentData {
    id: string,
    name: string,
    email: string,
    image: string
}
export interface Comment extends DocumentData{
    author?: User,
    text: string,
    createdAt: Date,
    postSlug: string,
    replies?: any[],
    email: string,
    upvotes : number,
    downvoters : string[],
    upvoters: string[],
}

export interface Upvote extends DocumentData { 
    user : DocumentReference<User>,
    comment : DocumentReference<Comment>,
    postSlug : string
}