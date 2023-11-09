import React from "react"
import {User} from "@/firebase/models"
import { getFirestoreClientInstance } from "@/firebase/firestoreClient"
import { collection, getDocs, query, where, CollectionReference} from "firebase/firestore"
export default function useUser(email : string) {
    const firestore = getFirestoreClientInstance()
    const [user,setUser] = React.useState<User>()
    const [loading,setLoading] = React.useState<boolean>(false)
    const userRef = collection(firestore,"users")  as CollectionReference<User>
    const getUserDoc = async () => {
        const queryUser = query(userRef, where('email', '==', email))
        return await getDocs(queryUser)
    }
    const fetchUser = async () => {
        setLoading(true)
        const data = await getUserDoc()
        const userDoc = data.docs[0]
        const user = userDoc.data()
        setUser(user)
        setLoading(false)
    }
    React.useEffect(() => {
        fetchUser()
    },[email])
    return {user,loading}
}