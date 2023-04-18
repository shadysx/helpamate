import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@react-native-material/core";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { WishService } from "../services/WishService";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const WishList = ({navigation}) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const wishRanking = 7;
  useEffect(() => {
    const fetchWishes = async () => {
      const wishService = new WishService();
      const fetchedWishes : Wish[] | null = await wishService.FetchWishes();
      setWishes(fetchedWishes);

    };
    fetchWishes();
  }, []);
  return (
    <>
    <SafeAreaView edges={["top"]}>
      <ScrollView>
          {wishes?.map((wish: Wish, index: number)=> (
              <ListItem
                  key={index}
                  leadingMode="avatar"
                  title={wish.title}
                  secondaryText={wish.description}
                  onPress={() => navigation.navigate("WishDetail", { wish })}
                  leading={
                      <Avatar image={{ uri: wish.user.avatarUrl }} />
                  }
                  trailing={
                    <View style={styles.trailingItemContainer}>
                      <MaterialIcons name={wishRanking >= 0 ? "arrow-upward" : "arrow-downward"} size={24} color={wishRanking >= 0 ? "green" : "red"}/>
                      <Text style={{color: wishRanking >= 0 ? "green" : "red"}}>
                        {wishRanking >= 0 ? `+${wishRanking}` : wishRanking}
                      </Text>
                    </View>
                  }
              />
          ))}
      </ScrollView>
    </SafeAreaView>
    </>
  )

};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flex: 1,
  },
  trailingItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default WishList;

