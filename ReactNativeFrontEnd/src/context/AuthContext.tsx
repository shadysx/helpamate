import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthService } from '../services/AuthService';
import JWT from 'expo-jwt';

type AuthContextType = {
    login: any,
    logout: any,
    isLoading: boolean,
    userToken: string,
    userInfo: any,
    error: string
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<User>(null);
    const [userToken, setUserToken] = useState(null);
    const [error, setError] = useState("");
    const authService = new AuthService();

    const login = (user: UserLoginDTO) => {
        setIsLoading(true);
        authService.Login(user)
        .then(res => {
            console.log("userInfo ", res.user)
            setUserInfo(res.user);
            setUserToken(res.jwt);
            AsyncStorage.setItem('userToken', res.jwt);
            setError("")
        })
        .catch(error => setError("Failed to connect, check credentials"));
        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        setIsLoading(false)
    }

    const isLoggedIn = async () => {
        try {
            setIsLoading(true)
            let localUserToken = await AsyncStorage.getItem('userToken');

            if(!isTokenExpired(localUserToken)){
                setUserToken(localUserToken)
                console.log("Token EXP IS OK")
            }
            else {
                setUserToken(null);
                console.log("Token EXP IS NOT OK")
            }
            setIsLoading(false);
        }
        catch (error) {
            console.log('isLogged in error ', error)
        }
    }

    // Need to be implemented on server side for security
    const isTokenExpired = (localUserToken: string) : boolean =>  {
        try {
            const currentTime = new Date().getTime();
            const decodedToken = JWT.decode(localUserToken, "My secret token API")
            console.log("bool: ", decodedToken.exp > currentTime)
            return decodedToken.exp > currentTime
        }
        catch (error){
            if(error == "Error: Token has expired"){
                return true
            }
        }

    }

    useEffect(() => {
        isLoggedIn();
    },[])


    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo, error}}>
            {children}
        </AuthContext.Provider>
    )
}