import React, { useEffect, useState } from "react";
import { ListItem, Avatar } from "@react-native-material/core";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { WishService } from "../services/WishService";
import { View, Text } from "react-native";

const WishList = () => {
  const [wishes, setWishes] = useState([]);
  useEffect(() => {
    const fetchWishes = async () => {
      const wishService = new WishService();
      const fetchedWishes = await wishService.FetchWishes();
      setWishes(fetchedWishes);
    };
    fetchWishes();
  }, []);
  return (
    <>
    <SafeAreaView edges={["top"]}>
      <ScrollView>
          {wishes.map((wish: Wish, index: number)=> (
              <ListItem
                  key={index}
                  leadingMode="avatar"
                  title={wish.user.username}
                  secondaryText={wish.description}
                  leading={
                      <Avatar image={{ uri: wish.user.avatarUrl }} />
                  }
                  />
          ))}
      </ScrollView>
    </SafeAreaView>
    </>
  )

};

export default WishList;

