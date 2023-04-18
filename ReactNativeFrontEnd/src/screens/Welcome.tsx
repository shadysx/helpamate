import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';

const Welcome = ({ navigation }) => {
  return (

    
    <ImageBackground 
      style={styles.container}
      source={require('../../assets/ice.jpeg')} 
    >
      <Image source={require('../../assets/gift.png')} style={styles.logo} />
      <Text style={styles.title}>Welcome to HelpAMate</Text>
      <Text style={styles.subtitle}>Your One Step From Helping Someone!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignIn')}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>


  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888888',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginBottom: 10,
    width: 120
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default Welcome;