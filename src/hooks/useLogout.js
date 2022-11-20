import { useEffect, useState } from "react";
import { auth, db } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { collection, doc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setIsPending(true)
    setError(null)
    
    // logout
    try {
      // update online status 
      const { uid } = user
      const colRef = collection(db, 'users')
      await updateDoc(doc(colRef, uid), {
        online: false
      })

      await signOut(auth)
      setIsPending(false)

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message)
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { logout, error, isPending }
}