import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const WishDetail = ({ route }) => {
  const { wish } = route.params;
  const { title, description, user } = wish; // Destructure the wish object
  const images = [
    "https://mui.com/static/images/avatar/1.jpg",
    "https://mui.com/static/images/avatar/2.jpg",
    "https://mui.com/static/images/avatar/3.jpg"
    ]

  return (
<SafeAreaView style={styles.container}>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.userContainer}>
          <Image style={styles.userAvatar} source={{ uri: user.avatarUrl }} />
          <Text style={styles.username}>{user.username}</Text>
        </View>
      </View>

      <View style={styles.swiperContainer}>
      <Text style={styles.title}>Images associées</Text>
      <Swiper style={styles.imageSlider} dotColor="#dddddd" activeDotColor="#333333">
        {images.map((imageUrl, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
        ))}
      </Swiper>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      flex: 1,
      marginBottom: 16,
    },
    contentContainer: {
      height: 110,
      padding: 16,
    },
    swiperContainer: {
        height: 500,
        padding: 16,

    },
    imageSlider: {
    },
    imageContainer: {
        marginBottom: 10,
        marginTop: 10,
        flex: 1,
      },
      image: {
        flex: 1,
        borderRadius: 10,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
      },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333333',
    },
    description: {
      fontSize: 14,
      color: '#666666',
      marginVertical: 8,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userAvatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 8,
    },
    username: {
      fontSize: 12,
      color: '#999999',
    },
  });
  
export default WishDetail;
