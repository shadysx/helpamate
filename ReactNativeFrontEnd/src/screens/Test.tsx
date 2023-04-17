import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { WishService } from '../services/WishService';
import { AuthService } from '../services/AuthService';
import { AuthContext } from '../context/AuthContext';


const AddWish = () => {
    const [value, setValue] = useState<WishCreationDTO>({ title: 'New Wish', description: 'For user 3', userId: 3});
    const [value2, setValue2] = useState<WishUpdateDTO>({ id: 5, title: 'Hello', description: 'For wish5'});
    const wishService = new WishService()
    const authService = new AuthService()
 
    const {login} = useContext(AuthContext);

    const handleSubmit = async () => {
      //console.log(value)
      //wishService.CreateWish(value)
      //wishService.UpdateWish(value2)
      //wishService.FetchWishById(12)
      //const user : UserRegisterDTO = {email: 'shady2@gmail.com', username: "shady2", password: "azerty"}
      const user : UserLoginDTO = {username: "shady2", password: "azerty"}
      const response = await login(user);
      console.log("testeee", response)

      
    };
  
    return (
        
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>AddWishes</Text>
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