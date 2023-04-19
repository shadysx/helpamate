import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { WishService } from '../services/WishService';
import { AuthContext } from '../context/AuthContext';
import MutipleImagePicker from '../components/MutipleImagePicker';
import { uploadImageAsync } from '../config/firebase';


const AddWish = ({navigation}) => {
    const [cacheImagesURI, setCacheImagesURI] = useState<string[]>([]);
    const [value, setValue] = useState({ title: 'Wish with pictures', description: 'For user 10', userId: 10});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const wishService = new WishService()
    
    const handleSubmit = async () => {
      try {
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
        await wishService.CreateWish(wish)
        setIsLoading(false)
        navigation.navigate("Wishes")
      }
      catch (error){
        //Modal here
        console.log(error)
      }
    };

    // When the picker is used
    const handleImageChanged = (data: string[]) => {
      setCacheImagesURI(data);
    }

    const ImagePreview = ({ images }) => {
      return (
        <View style={styles.imageContainer}>
          {images.map((uri, index) => (
            <Image key={index} source={{ uri }} style={styles.previewImage} />
          ))}
        </View>
      );
    };

    if(isLoading){
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={'large'}/>
        </View>
      )
    } 
    
    return (
        
      <SafeAreaView style={styles.container}>
        <View>
          
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
          <ImagePreview images={cacheImagesURI} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      borderRadius: 10,
      justifyContent: 'space-between'
    },
    inputSection: {

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
      backgroundColor: 'orange',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
    },
    imageContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // justifyContent: 'center',
      marginTop: 10,
    },
    previewImage: {
      width: 100,
      height: 100,
      borderRadius: 5,
      margin: 5,
    },
  });
  

export default AddWish