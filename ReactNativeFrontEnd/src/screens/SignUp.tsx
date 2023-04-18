
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';
import { UserService } from '../services/UserService';
import { AuthService } from '../services/AuthService';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const SignupScreen = ({ navigation }) => {
  const [user, setUser] = useState<UserRegisterDTO>({
    email: "",
    username: "",
    password: ""
  })

  async function handleSignUp() {
    
  }


  useEffect(() => {
  })


  return (
    <ImageBackground
      source={require('../../assets/ice.jpeg')}
      style={styles.container}
    >
      <View style={styles.signupContainer}>
        <TextInput
          value={user.username}
          onChangeText={(text) => setUser({...user, username: text})}
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#777"
        />
        <TextInput
          value={user.email}
          onChangeText={(text) => setUser({...user, email: text})}
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#777"
        />
        <TextInput
          value={user.password}
          onChangeText={(text) => setUser({...user, password: text})}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#777"
        />
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity style={styles.loginButtonContainer} onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  loginContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  loginText: {
    color: '#777',
    fontSize: 14,
  },
  loginButtonContainer: {
    marginLeft: 5,
  },
  loginButtonText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default SignupScreen;