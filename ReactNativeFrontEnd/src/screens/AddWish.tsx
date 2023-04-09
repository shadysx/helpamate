import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { WishService } from '../services/WishService';
import { useAuth } from '../context/Auth';

const AddWish = () => {
    const {currentUser, auth} = useAuth() 

    const [value, setValue] = useState<Wish>({ title: '', description: '', userId: currentUser.id});
    const wishService = new WishService()
 


    const handleSubmit = () => {
        console.log(value)
      wishService.CreateWish(value)
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