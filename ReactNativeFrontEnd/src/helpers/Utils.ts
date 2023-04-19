import * as ImagePicker from 'expo-image-picker';

export const pickImage = async () =>  {
    try {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [6, 3],
        quality: 0,
        allowsMultipleSelection: false
      });

      if (!result.canceled) {
        let selectedImage = result.assets[0].uri
        return selectedImage;
      }
    }
    catch(error) {
      console.log("error in pickimage", error);
    }  
  }