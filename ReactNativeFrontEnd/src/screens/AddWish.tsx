import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { WishService } from '../services/WishService';
import { AuthContext } from '../context/AuthContext';
import MutipleImagePicker from '../components/MutipleImagePicker';
import { uploadImageAsync } from '../config/firebase';
import { MaterialIcons } from '@expo/vector-icons';
import ImagePlaceHolder from '../components/ImagePlaceHolder';
import { pickImage } from '../helpers/Utils';



const AddWish = ({navigation}) => {
    const [cacheImagesURI, setCacheImagesURI] = useState<string[]>([]);
    const [value, setValue] = useState({ title: '', description: ''});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {userInfo} = useContext(AuthContext);

    const wishService = new WishService()
    
    const isSubmitEnabled = value.title.length > 0 && value.description.length > 0 && cacheImagesURI.length > 0;

    const handleSubmit = async () => {
      try {
        setIsLoading(true)
        // Upload all images that are in the cache to firebase, and return a promise with all the Picture models
        const promises = cacheImagesURI.map(async (uri: string, index: number) => {
          const firebasePicture: Picture = { pictureUrl: await uploadImageAsync(uri) };
          return firebasePicture;
        })
  
        //Waiting for the images to be uploaded
        const resolvedImages: Picture[] = await Promise.all(promises);
  
        // Creating the actual wish
        const wish: WishCreationDTO = {title: value.title, description: value.description, userId: userInfo.id, wishPictures: resolvedImages}
        await wishService.CreateWish(wish)
        setIsLoading(false)

        // Reset the forms
        setValue({ title: '', description: ''})
        setCacheImagesURI([])

        // Go to wishes
        navigation.navigate("Wishes")
      }
      catch (error){
        //Modal here
        console.log(error)
      }
    };

    const handleAddImage = async (index) => {
      const selectedImage: string = await pickImage() 
      setCacheImagesURI((prevCacheImagesURI) => [...prevCacheImagesURI, selectedImage]);
    }


    
    const handleDeleteImage = (indexToRemove) => {
      console.log("Delete image at : ", indexToRemove)
      setCacheImagesURI((prevCacheImagesURI) =>
      prevCacheImagesURI.filter((_, index) => index !== indexToRemove)
    );
    }

    if(isLoading){
      return (
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator size={'large'}/>
        </View>
      )
    } 
    
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container} >
      <View>
        <View style={styles.topRow}>
          <Text style={styles.label}>Title</Text>
          {/* <Button onPress={() => navigation.goBack()} title="Cancel" /> */}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={value.title}
          onChangeText={(text) => setValue({...value, title: text})}
        />
        <Text style={styles.label}>Description</Text>
        <TextInput
          editable
          multiline // Add this prop
          numberOfLines={4} // Add this prop and set the desired number of lines
          style={styles.inputArea}
          placeholder="Enter description"
          value={value.description}
          onChangeText={(text) => setValue({...value, description: text})}
          maxLength={140}
          returnKeyType='done'
          onSubmitEditing={() => Keyboard.dismiss()}
        />
        <Text style={styles.label}>Add Images</Text>
        <ImagePlaceHolder images={cacheImagesURI} numberOfImages={3} onAdd={handleAddImage} onDelete={handleDeleteImage}  />
      </View>

      <TouchableOpacity style={[styles.button]} onPress={handleSubmit} disabled={!isSubmitEnabled}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>  
    );
  };
  

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      borderRadius: 10,
      justifyContent: 'space-between',
      backgroundColor: '#FAFAFA',
    },
    topRow: {
      flexDirection: "row",
      alignItems: 'center',
      justifyContent: "space-between"
    },
    label: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 5,
      color: '#333',
    },
    input: {
      maxHeight: 160,
      borderColor: '#E2E2E2',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#FFF',
      fontSize: 16,
      textAlignVertical: 'top', // Add this to align the text at the top in Android devices
    },
    inputArea: {
      height: 120,
      borderColor: '#E2E2E2',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
      backgroundColor: '#FFF',
      fontSize: 16,
      textAlignVertical: 'top', // Add this to align the text at the top in Android devices
    },
    button: {
      backgroundColor: '#1E88E5',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginBottom: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
    },
  });
  

export default AddWish