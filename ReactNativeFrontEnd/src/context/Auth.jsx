import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'


export const AuthContext = React.createContext()

export function useAuth() {
  return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {        
        console.log("User logged in: ", JSON.stringify(user, null, 2))
        setCurrentUser(user)
      } else {
        console.log("User logged out")
        setCurrentUser(null)
      }
    })
    // Unsubscribe from the onAuthStateChanged listener when the component unmounts
    return unsubscribe
  },[])



  return (
    <AuthContext.Provider value={{currentUser, auth}}>
      {children}
    </AuthContext.Provider>
  )
}