import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import RootNavigation from './src/navigation';
import { AuthContext, AuthProvider } from './src/context/Auth';
import AuthStack from './src/navigation/authStack';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';





const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
        <RootNavigation/>
    </AuthProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});


