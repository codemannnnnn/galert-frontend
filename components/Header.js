import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Menu } from "./Menu.js";

export const Header = () => {
  return (
    <View>
      <View>
        <Text style={style.header}>Gun Alert</Text>
      </View>
      <View>
        <Menu />
      </View>
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
