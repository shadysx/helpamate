import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import WishList from './WishList';
import MyProfile from './MyProfile';
import { AuthContext } from '../context/Auth';

const Tab = createBottomTabNavigator();

const Logged = () => {
  return (
    <View style={{flex: 1}}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'Wishes') {
                return (
                    <Ionicons
                    name={
                        focused
                        ? 'ios-search'
                        : 'ios-search-outline'
                    }
                    size={size}
                    color={color}
                    />
                );
                } else if (route.name === 'My Profile') {
                return (
                    <Ionicons
                    name={focused ? 'person-circle' : 'person-circle-outline'}
                    size={size}
                    color={color}
                    />
                );
                }
            },
            tabBarInactiveTintColor: 'gray',
            tabBarActiveTintColor: 'tomato',
            })}
        >
            <Tab.Screen name="Wishes" component={WishList} options={{ headerShown: false }}/>
            <Tab.Screen name="My Profile" component={MyProfile}options={{ headerShown: false }}/>
        </Tab.Navigator>
    </View>
  )

}


export default Logged