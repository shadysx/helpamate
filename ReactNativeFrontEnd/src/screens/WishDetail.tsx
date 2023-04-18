import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const WishDetail = ({ route }) => {
  const { wish } = route.params;
  const { title, description, user, wishPictures } = wish; // Destructure the wish object

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
      <Text style={styles.title}>Images</Text>
      <Swiper style={styles.imageSlider} activeDotColor="#dddddd" dotColor="#333333">
        {wishPictures.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: image.pictureUrl }} />
          </View>
        ))}
      </Swiper>
      </View>
      <VoteBar onDownvote={() => {}} onHelp={() => {}} onUpvote={() => {}}/>

    </SafeAreaView>
  );
};

const VoteBar = ({ onDownvote, onHelp, onUpvote }) => {
    return (
      <View style={styles.voteBarContainer}>
        <TouchableOpacity style={styles.buttonLeft} onPress={onDownvote}>
          <Text style={styles.buttonText}>Downvote</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonMiddle} onPress={onHelp}>
          <Text style={styles.buttonText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRight} onPress={onUpvote}>
          <Text style={styles.buttonText}>Upvote</Text>
        </TouchableOpacity>
      </View>
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
      height: 150,
      padding: 16,
    },
    swiperContainer: {
        marginTop: 30,
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
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333333',
    },
    description: {
      fontSize: 18,
      color: '#666666',
      marginVertical: 8,
    },
    userContainer: {
      marginTop: 10,
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
      fontSize: 17,
      color: '#999999',
    },
    // VoteBar
    voteBarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      buttonLeft: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#FFCCCB",
        borderRadius: 10,
        padding: 8,
        margin: 16,
      },
      buttonMiddle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "lightblue",
        borderRadius: 10,
        padding: 8,
        margin: 16,
      },
      buttonRight: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "lightgreen",
        borderRadius: 10,
        padding: 8,
        margin: 16,
      },
      buttonText: {
        fontSize: 16,
        color: '#333333',
      },
  });
  
export default WishDetail;
