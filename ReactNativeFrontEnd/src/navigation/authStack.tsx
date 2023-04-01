import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens

import Logged from '../screens/Logged';

const Stack = createStackNavigator();
export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Logged"
          component={Logged}
          options={{ headerShown: false  }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}