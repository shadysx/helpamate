import React from "react";
import { ListItem, Avatar } from "@react-native-material/core";
import data from "../../assets/data";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const WishList = () => (
  <>
  <SafeAreaView edges={["top"]}>
    <ScrollView>
        {data.map((wish: Wish)=> (
            <ListItem
                key={wish.id}
                leadingMode="avatar"
                title={wish.title}
                secondaryText={wish.description}
                leading={
                    <Avatar image={{ uri: wish.avatar }} />
                }/>
        ))}
    </ScrollView>
  </SafeAreaView>
  </>
);

export default WishList;

