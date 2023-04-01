import { View, Text } from 'react-native'
import { AuthProvider } from '../context/Auth';
import { AuthContext } from '../context/Auth';
import { useContext } from 'react';
import Logged from '../screens/Logged';
import { NavigationContainer } from '@react-navigation/native';
import UnAuthStack from './unAuthStack';
import AuthStack from './authStack';

const RootNavigation = () => {
  //const { user } = useAuth();
  //return user ? null : <AuthStack/>;

  const {currentUser} = useContext(AuthContext)

  if(currentUser){
    return <AuthStack/>
  }

  else {
    return <UnAuthStack/>
  }
}

export default RootNavigation;

