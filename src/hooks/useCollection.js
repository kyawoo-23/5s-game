import { useState, useEffect, useRef } from "react"
import { db } from "../firebase/config"
import { collection, where, orderBy, query, onSnapshot } from "firebase/firestore"

// export const useCollection = (col, _query, _orderBy) => {
export const useCollection = (col) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)

  // if we don't use a ref --> infinite loop in useEffect
  // _query is an array and is "different" on every function call
  // const query = useRef(_query).current
  // const orderBy = useRef(_orderBy).current
  useEffect(() => {
    let colRef = collection(db, col)
    setIsPending(true)
    // if (query) {
    //   colRef = ref.where(...query)
    // }
    // if (orderBy) {
    //   colRef = ref.orderBy(...orderBy)
    // }
    const q = query(colRef, orderBy("games.fiveSecondGame.score", "desc"))

    const unsub = onSnapshot(q, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({ ...doc.data(), id: doc.id })
      })

      // update state
      setDocuments(results)
      setError(null)
      setIsPending(false)
    }, (err) => {
      setError('Could not fetch data')
      console.log(err.message)
      setIsPending(false)
    })

    // unsub on unmount
    return () => unsub()
  }, [col])
  // }, [col, query, orderBy])

  return { documents, error, isPending }
}
