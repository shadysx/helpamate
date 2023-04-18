
import React, { useContext, useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from '../context/AuthContext';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';

const SignIn = ({ navigation }) => {
  const {login, error} = useContext(AuthContext);

  const [user, setUser] = useState<UserLoginDTO>({
    username: "shady2",
    password: "azerty"
  });


  async function handleLogin() {
    await login(user);
  }

  return (
    <ImageBackground
      source={require('../../assets/ice.jpeg')}
      style={styles.container}
    >
      <View style={styles.loginContainer}>
        {error != "" ? <Text style={{color: 'orange', marginBottom: 20}}>{error}</Text> : null}
        <TextInput
          style={styles.input}
          value={user.username}
          onChangeText={(text) => setUser({...user, username: text})}
          placeholder="Username"
          placeholderTextColor="#777"
        />
        <TextInput
          style={styles.input}
          value={user.password}
          onChangeText={(text) => setUser({...user, password: text})}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor="#777"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPasswordContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signupButtonContainer} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 15,
  },
  forgotPasswordText: {
    color: '#777',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  signupText: {
    color: '#777',
    fontSize: 14,
  },
  signupButtonContainer: {
    marginLeft: 5,
  },
  signupButtonText: {
    color: '#007BFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});


export default SignIn
