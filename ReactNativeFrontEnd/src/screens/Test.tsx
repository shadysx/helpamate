import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { WishService } from '../services/WishService';
import { useAuth } from '../context/Auth';
import { AuthService } from '../services/AuthService';


const AddWish = () => {
    const {currentUser, auth} = useAuth() 

    const [value, setValue] = useState<WishCreationDTO>({ title: 'New Wish', description: 'For user 3', userId: 3});
    const [value2, setValue2] = useState<WishUpdateDTO>({ id: 5, title: 'Hello', description: 'For wish5'});
    const wishService = new WishService()
    const authService = new AuthService()
 


    const handleSubmit = () => {
      //console.log(value)
      //wishService.CreateWish(value)
      //wishService.UpdateWish(value2)
      //wishService.FetchWishById(12)
      //const user : UserRegisterDTO = {email: 'shady2@gmail.com', username: "shady2", password: "azerty"}
      const user : UserLoginDTO = {username: "shady2", password: "azerty"}
      authService.Login(user);

      
    };
  
    return (
        
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={value.title}
          onChangeText={(text) => setValue({...value, title: text})}
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={value.description}
          onChangeText={(text) => setValue({...value, description: text})}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'blue',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
    },
  });
  

export default AddWish