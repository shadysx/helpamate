import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react'
import { Avatar } from "@react-native-material/core";
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../context/Auth';
import { signOut } from 'firebase/auth';
import axios from 'axios';


const MyProfile = ({ navigation }) => {
    const {currentUser, auth} = useAuth()
    const [users, setUsers] = useState<User[]>([]);

    const handleLogout = () => {
        signOut(auth);
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://localhost:7249/user', {
              headers: {
                'Content-Type': 'application/json'
              }
            });
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.log("Handled Error: ", error);
          }
        };
        fetchData();
      }, []);


  return (
    <SafeAreaView edges={["top"]} style={{flex:1}}>
        <View style={styles.titleSection}>
            <Text style={styles.heading}>My Profile</Text>
        </View>
        <View style={styles.avatarSection}>
            <Avatar 
                label="Kent Dodds" 
                size={120}
                image={{ uri: "https://mui.com/static/images/avatar/3.jpg" }}/>
        </View>
        <View style={styles.userInfo}>
            <Text >Connected as {currentUser.email}</Text>
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



