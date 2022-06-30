import { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import Image from "react-native-scalable-image";

export default function ListItem({ item, ...props }) {
  useState(() => {
    console.log(item);
  });
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        padding: 10,
      }}
    >
      <Image
        source={{
          uri: `https://image.auction.co.kr/itemimage${item.product_image_url}`,
        }}
        resizeMode="contain"
        width={Math.floor(Dimensions.get("window").width * 0.3) - 20}
      />
      <View
        style={{
          width: "70%",
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
          marginLeft: 10,
        }}
      >
        <View style={{ width: "30%" }}>
          <Text>location:</Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>{item.location}</Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text>name:</Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>{item.product_name}</Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text>тээврийн зардал:</Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>{item.shipping_cost}</Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text>үнэ:</Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>{item.total_price}</Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text>ширхэг:</Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>{item.stockQuantity}</Text>
        </View>
        <View style={{ width: "30%" }}>
          <Text>огноо:</Text>
        </View>
        <View style={{ width: "70%" }}>
          <Text>{item.status_date}</Text>
        </View>
      </View>
    </View>
  );
}
