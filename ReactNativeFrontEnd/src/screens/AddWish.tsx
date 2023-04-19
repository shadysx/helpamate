import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { WishService } from '../services/WishService';
import { AuthContext } from '../context/AuthContext';
import MutipleImagePicker from '../components/MutipleImagePicker';
import { uploadImageAsync } from '../config/firebase';


const AddWish = () => {
    const [cacheImagesURI, setCacheImagesURI] = useState<string[]>([]);
    const [value, setValue] = useState({ title: 'Wish with pictures', description: 'For user 10', userId: 10});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const wishService = new WishService()
    
    const handleSubmit = async () => {
      if(cacheImagesURI.length === 0)
         

      setIsLoading(true)
      // Upload all images that are in the cache to firebase, and return a promise with all the Picture models
      const promises = cacheImagesURI.map(async (uri: string, index: number) => {
        const firebasePicture: Picture = { pictureUrl: await uploadImageAsync(uri) };
        return firebasePicture;
      })

      //Waiting for the images to be uploaded
      const resolvedImages: Picture[] = await Promise.all(promises);

      // Creating the actual wish
      const wish: WishCreationDTO = {title: value.title, description: value.description, userId: value.userId, wishPictures: resolvedImages}
      wishService.CreateWish(wish)
      console.log("sent ",JSON.stringify(wish, null, 2)) // This line value is null and shouldnt be 
      setIsLoading(false)
    };

    // When the picker is used
    const handleImageChanged = (data: string[]) => {
      setCacheImagesURI(data);
    }

    if(isLoading){
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={'large'}/>
        </View>
      )
    } 
    
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