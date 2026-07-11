import { AR_currency } from "@/utils/format";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ItemProp = {
  item: {
    title: string;
    quantity: number;
    price: number;
  };
};

export default function Item({ item }: ItemProp) {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>{item.title}</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text2}>
            {"$ "}
            {AR_currency.format(item.price)}
          </Text>
          <Text style={styles.text2}>
            {" x "}
            {item.quantity.toString().replace(".", ",")}
          </Text>
        </View>
      </View>
      <Text style={styles.text3}>
        $ {AR_currency.format(item.price * item.quantity)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "blue",
    flexDirection: "row",
    padding: 14,
    paddingHorizontal: 16,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    // backgroundColor: "#72361a",
  },
  text2: {
    color: "#fff",
    fontSize: 14,
    // backgroundColor: "#162257",
  },
  text3: {
    color: "#fff",
    fontSize: 24,
    // backgroundColor: "#155c24",
    textAlignVertical: "bottom",
  },
});
