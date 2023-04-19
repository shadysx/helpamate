import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
//Screens
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import React from 'react';
import MyProfile from '../screens/MyProfile';
import WishList from '../screens/WishList';
import AddWish from '../screens/AddWish';
import Test from '../screens/Test';
import WishDetail from '../screens/WishDetail';
import HeaderBanner from '../components/HeaderBanner';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function TabMenu({navigation}) {
  return (

    <View style={{flex: 1}}>
        <SafeAreaView style={{backgroundColor: 'white'}}/>
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
            tabBarActiveTintColor: '#1E88E5',
            })}
        >
            <Tab.Screen name="Wishes" component={WishList} options={{ headerShown: false }}/>
            <Tab.Screen name="My Profile" component={MyProfile}options={{ headerShown: false, }}/>
        </Tab.Navigator>
    </View>
  );
}

export const Main = () => (
  <>


  <View style={{ flex: 1}}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabMenu" component={TabMenu} options={{ headerShown: false }}/>
        <Stack.Screen name="WishDetail" component={WishDetail} options={{ headerShown: false }}/>
        <Stack.Group screenOptions={{ presentation: 'modal' }}>
          <Stack.Screen name="AddWish" component={AddWish} options={{headerShown: false,}}/>
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  </View>
  </>
  );