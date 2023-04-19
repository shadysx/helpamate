import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { WishService } from '../services/WishService';
import { AuthContext } from '../context/AuthContext';
import MutipleImagePicker from '../components/MutipleImagePicker';


const AddWish = () => {
    const [images, setImages] = useState<Picture[]>(null);
    const [value, setValue] = useState<WishCreationDTO>({ title: 'Wish with pictures', description: 'For user 10', userId: 10, wishPictures: images});

    const wishService = new WishService()
 
    const handleSubmit = () => {
        wishService.CreateWish(value);
    };

    const handleImageChanged = (data) => {
      setImages(data)
      console.log(JSON.stringify(data, null, 2))
    }
  
    useEffect(() => {
      // Update the value state with the latest images state
      setValue({ ...value, wishPictures: images });
    }, [images]);
    
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
        <MutipleImagePicker onImageChanged={handleImageChanged}/>
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