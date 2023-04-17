// import React, { useEffect, useState } from 'react'
// import { UserService } from '../services/UserService'
// import { AuthService } from '../services/AuthService'


// export const AuthContext = React.createContext()

// export function useAuth() {
//   return React.useContext(AuthContext)
// }

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState()

//   const authService = new AuthService()

//   const Login = () => {
//     authService.Login()
//   }
  
//   useEffect(() => {
   
//   },[])



//   return (
//     <AuthContext.Provider value={{currentUser}}>
//       {children}
//     </AuthContext.Provider>
//   )
// }