import { View, Text, TextInput, Button } from 'react-native'
import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../context/Auth';





const SignIn = ({ navigation }) => {
  const {auth} = useAuth()

  const [value, setValue] = React.useState({
    email: "shady12345@gmail.com",
    password: "qwerty",
    error: "",
  });


  async function handleLogin() {
    signInWithEmailAndPassword(auth, value.email, value.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user.email)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }


  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Username"
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200 }}
      />
      <TextInput
        placeholder="Password"
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: 200 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Don't have an account?"  onPress={() => navigation.navigate("SignUp")}/>
    </View>
  )
}

export default SignIn
