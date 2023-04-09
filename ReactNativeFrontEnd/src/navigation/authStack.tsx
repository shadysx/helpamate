import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//Screens
import { View } from 'react-native';
import React from 'react';
import MyProfile from '../screens/MyProfile';
import WishList from '../screens/WishList';
import AddWish from '../screens/AddWish';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function AuthStack() {
  return (
    <NavigationContainer>
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
                } 
                else if (route.name === 'My Profile') {
                  return (
                    <Ionicons
                    name={focused ? 'person-circle' : 'person-circle-outline'}
                    size={size}
                    color={color}
                    />
                  );
                } 
                else if (route.name === 'Add') {
                  return (
                      <Ionicons
                      name={focused ? 'add-circle' : 'add-circle-outline'}
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
            <Tab.Screen name="Add" component={AddWish} options={{ headerShown: false }}/>
            <Tab.Screen name="My Profile" component={MyProfile}options={{ headerShown: false }}/>
        </Tab.Navigator>
    </View>
    </NavigationContainer>
    

  );
}