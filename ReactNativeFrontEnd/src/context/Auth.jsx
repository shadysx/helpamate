import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { UserService } from '../services/UserService'


export const AuthContext = React.createContext()

export function useAuth() {
  return React.useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentFirebaseUser, setCurrentFirebaseUser] = useState()
  const [currentUser, setCurrentUser] = useState()
  
  const userService = new UserService()
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {        
        //console.log("User logged in: ", JSON.stringify(user, null, 2))
        setCurrentFirebaseUser(user)

        // Get the associated user data from the .NET API, based on the firebase user email
        // userService.FetchUsers()
        // .then(users => {
        //   let u = users.find(u => u.email == user.email)
        //   setCurrentUser(u)
        // })
      } else {
        console.log("User logged out")
        setCurrentFirebaseUser(null)
      }
    })
    // Unsubscribe from the onAuthStateChanged listener when the component unmounts
    return unsubscribe
  },[])



  return (
    <AuthContext.Provider value={{currentFirebaseUser, currentUser, auth}}>
      {children}
    </AuthContext.Provider>
  )
}