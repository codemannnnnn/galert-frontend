import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
  return (
    <View>
      <Text style={style.header}>Gun Alert</Text>
    </View>
  );
};

const style = StyleSheet.create({
  header: {
    fontSize: 40,
    color: "#000",

    // display: "flex",
    // alignItems: "center",
    // margin: "auto",
  },
});
