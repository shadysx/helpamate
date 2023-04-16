
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/Auth';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';

const SignupScreen = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: 'shadytest@gmail.com',
    password: 'testts',
    error: ''
  })

  const {currentUser, auth} = useAuth()

  async function handleSignUp() {
    
  }


  useEffect(() => {
  })


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={value.email}
        onChangeText={(text) => setValue({ ...value, email: text })}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={value.password}
        onChangeText={(text) => setValue({ ...value, password: text })}
        secureTextEntry
      />
      <Button title="Sign up" onPress={handleSignUp} />
      <Button title="Already have an account?" onPress={() => navigation.navigate("SignIn")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

export default SignupScreen;