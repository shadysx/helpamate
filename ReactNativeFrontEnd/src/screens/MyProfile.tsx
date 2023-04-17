import { View, Text, Button } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Avatar } from "@react-native-material/core";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import axios from 'axios';


const MyProfile = ({ navigation }) => {
    const {logout, userInfo} = useContext(AuthContext)   

    const handleLogout = () => {
        logout();
    };
    useEffect(() => {
        console.log("profile", userInfo)
    })

  return (
    <SafeAreaView edges={["top"]} style={{flex:1}}>
        <View style={styles.titleSection}>
            <Text style={styles.heading}>My Profile</Text>
        </View>
        <View style={styles.avatarSection}>
            <Avatar 
                label="Kent Dodds" 
                size={120}
                image={{ uri: userInfo?.avatarUrl }}
                />
        </View>
        <View style={styles.userInfo}>
            <Text >Connected as {userInfo?.username}</Text>
        </View>

        <Button title="Logout" onPress={handleLogout} />
    </SafeAreaView>
  )
}

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

export default MyProfile



