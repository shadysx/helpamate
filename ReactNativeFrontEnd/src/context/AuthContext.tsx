import React, {createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthService } from '../services/AuthService';

type AuthContextType = {
    login: any,
    logout: any,
    isLoading: boolean,
    userToken: string,
    userInfo: any
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [userToken, setUserToken] = useState(null);
    const authService = new AuthService();

    const login = (user: UserLoginDTO) => {
        setIsLoading(true);
        authService.Login(user)
        .then(res => {
            let userInfo = res;
            console.log("first", userInfo)
            setUserInfo(userInfo);
            setUserToken(userInfo.jwt);
            AsyncStorage.setItem('userToken', userInfo.jwt);
        })
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
            let userToken = await AsyncStorage.getItem('userToken');
            setUserToken(userToken);
            setIsLoading(false);
        }
        catch (error) {
            console.log('isLogged in error ', error)
        }
    }

    useEffect(() => {
        isLoggedIn();
    },[])


    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}