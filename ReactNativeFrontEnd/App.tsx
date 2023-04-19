import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigation from './src/navigation';
import { AuthContext, AuthProvider } from './src/context/AuthContext';
import AuthStack from './src/navigation/mainStack';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';


export default function App() {
  return (
    <AuthProvider>       
        <RootNavigation/>
    </AuthProvider>

  );
}




