import { DocumentData, DocumentReference, Timestamp } from "firebase/firestore";
export interface User extends DocumentData {
  id: string;
  name: string;
  email: string;
  image: string;
}
export interface Comment extends DocumentData {
  author?: User;
  text: string;
  createdAt: Timestamp;
  postSlug: string;
  replies?: any[];
  email: string;
  upvotes: number;
  downvoters: string[];
  upvoters: string[];
}

export interface Upvote extends DocumentData {
  user: DocumentReference<User>;
  comment: DocumentReference<Comment>;
  postSlug: string;
}
