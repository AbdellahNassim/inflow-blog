import { getApp, getApps, initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { firebaseConfig } from "@/config/firebaseConfig"

export const getFirestoreClientInstance = () => {
    if (getApps().length === 0) {
      initializeApp(firebaseConfig)
    }
    const app = getApp()
    const db = getFirestore(app)
    return db
  }