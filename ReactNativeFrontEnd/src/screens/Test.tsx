import { Avatar } from '@react-native-material/core';
import React, { useContext } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';


const Test = ({ route }) => {
  const {userInfo} = useContext(AuthContext);
  console.log("info   ", userInfo)
  const { wish } = route.params;
  return (
    <>
        <View style={styles.avatarSection}>
       <Avatar 
        label="Kent Dodds" 
        size={120}
        image={{ uri: userInfo?.avatarUrl }}
        />
    </View>
    <View><Text>{JSON.stringify(wish, null, 2)}</Text></View>
    </>

  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  titleSection: {
      height: "8%",
      alignItems: 'center',
      justifyContent: 'center'

  },
  heading: {
      fontSize: 30
  },
  avatarSection: {
      height: '20%',
      justifyContent: 'center',
      alignItems: "center"
  },
  userInfo: {
      justifyContent: 'center',
      alignItems: 'center'
  }
})

export default Test;