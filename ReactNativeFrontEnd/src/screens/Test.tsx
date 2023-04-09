
import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useReducer, useState } from 'react'
import { UserService } from '../services/UserService'

const Test = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const wishService = new UserService();
      const fetchedWishes = await wishService.FetchUsers();
      setUsers(fetchedWishes);
    };
    fetchUsers();
  }, []);
  return (
    <View style={styles.container}>
      {users.map((user: User, index: number) => (
        <View key={index}>
          <Text>{user.username}</Text>
          <Text>{user.avatarUrl}</Text>
          {user.wishes.map((wish: Wish, index: number) => (
            <View key={index}>
              <Text>{wish.title}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Test