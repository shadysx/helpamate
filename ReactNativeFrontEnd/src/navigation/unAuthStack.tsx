import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import Logged from '../screens/Logged';

const Stack = createStackNavigator();

export default function UnAuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false  }}
        />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false  }}
      />

        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false  }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}