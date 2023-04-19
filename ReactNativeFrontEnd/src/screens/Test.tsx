import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../config/firebase';

const ImagePickerExample = ({navigation}) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0,
      });

      console.log(JSON.stringify(result, null, 2));

      if (!result.canceled) {
        setImage(result.assets[0].uri); 
        await uploadImageAsync(result.assets[0].uri)
      }
    }
    catch(error) {
      console.log("error in pickimage", error);
    }  
  }


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
}

export default ImagePickerExample