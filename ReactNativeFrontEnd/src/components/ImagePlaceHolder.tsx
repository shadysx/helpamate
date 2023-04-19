import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ImagePlaceHolder = ({ images, numberOfImages, onAdd, onDelete }) => {
    return (
        <View style={styles.container}>
          {Array.from({ length: numberOfImages }).map((_, index) => (
            <View key={index} style={styles.previewImagePlaceHolder}>
              {images[index] && (
                <Image key={index} source={{ uri: images[index] }} style={styles.previewImage} />
              )}
              <View style={styles.plusIcon}>
                <TouchableOpacity
                  onPress={() => {
                    if (images[index]) {
                      onDelete(index);
                    } else {
                      onAdd(index);
                    }
                  }}
                >
                  {images[index] ? (
                    <MaterialIcons name={'remove-circle'} size={26} color='orange' />
                  ) : (
                    <MaterialIcons name={'add-circle'} size={26} color={'green'} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
    );
  };

const styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between",
      },
      previewImage: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
      },
      previewImagePlaceHolder: {
        width: 105,
        height: 140, // Updated height value
        margin: 5,
        borderWidth: 2,
        borderColor: '#E2E2E2',
        borderStyle: 'dotted',
        borderRadius: 5,
        position: "relative",
        overflow: "visible",
        backgroundColor: '#EFEFEF'
      },
      plusIcon: {
        overflow: "visible",
        position: 'absolute',
        bottom: -8,
        right: -8,
        width: 26, // Adjust the width and height as needed
        height: 26,
      },
  });

export default ImagePlaceHolder