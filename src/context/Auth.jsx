import React, { Children, useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { auth } from '../config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import UnAuthStack from '../navigation/unAuthStack'
import Logged from '../screens/Logged'

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {        
        console.log("ifuser: ", user)
        setCurrentUser(user)
      } else {
        console.log("ifnotuser")
        setCurrentUser(null)
      }
    })
    // Unsubscribe from the onAuthStateChanged listener when the component unmounts
    return unsubscribe
  },[])



  return (
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}