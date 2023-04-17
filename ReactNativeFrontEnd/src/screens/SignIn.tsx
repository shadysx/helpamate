import { View, Text, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../context/AuthContext';

const SignIn = ({ navigation }) => {
  const {login} = useContext(AuthContext);

  const [user, setUser] = useState<UserLoginDTO>({
    username: "shady2",
    password: "azerty"
  });


  async function handleLogin() {
    await login(user);
  }

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Username"
        value={user.username}
        onChangeText={(text) => setUser({ ...user, username: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200 }}
      />
      <TextInput
        placeholder="Password"
        value={user.password}
        onChangeText={(text) => setUser({ ...user, password: text })}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Don't have an account?"  onPress={() => navigation.navigate("SignUp")}/>
    </View>
  )
}

export default SignIn
