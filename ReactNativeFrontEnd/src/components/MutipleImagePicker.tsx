import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { uploadImageAsync } from '../config/firebase';

const MutipleImagePicker = ({ onImageChanged }) => {
  const pickImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 0,
        allowsMultipleSelection: true
      });

      if (!result.canceled) {
        let selectedImages = result.assets.map(asset => ({ pictureUrl: asset.uri})); 
        onImageChanged(selectedImages)
      }
    }
    catch(error) {
      console.log("error in pickimage", error);
    }  
  }
  return <View><Button title="Pick an image from camera roll" onPress={pickImage} /></View>
}

export default MutipleImagePicker