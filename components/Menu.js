import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MenuView } from "@react-native-menu/menu";

export const Menu = () => {
  return (
    <View>
      <Text style={styles.hamburger}></Text>
    </View>
  );
};

const styles = {
  container: {},
  button: {},
  buttonText: {},
  hamburger: {
    padding: 4,
    color: "#333",
  },
};
