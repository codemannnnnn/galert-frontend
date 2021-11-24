import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacityBase,
  View,
  TouchableOpacity,
} from "react-native";
import { MenuView } from "@react-native-menu/menu";
import { useFonts } from "expo-font";

export const Menu = ({ username }) => {
  const [showMenu, setShowMenu] = useState(true);
  const [loaded] = useFonts({
    main: require("../assets/fonts/main.ttf"),
    bold: require("../assets/fonts/Oxygen-Bold.ttf"),
    reg: require("../assets/fonts/Oxygen-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const handleToggle = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };

  return (
    <>
      <View>
        <TouchableOpacity onPress={handleToggle}>
          <View>
            <View style={styles.hamburger}></View>
            <View style={styles.hamburger}></View>
            <View style={styles.hamburger}></View>
          </View>
        </TouchableOpacity>
      </View>

      {showMenu ? (
        <Text></Text>
      ) : (
        <View>
          <View style={styles.modal}>
            <TouchableOpacity>
              <Text style={styles.modalText}>{`Hello, ${username}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.modalText}>Favorites</Text>
            </TouchableOpacity>
            <View style={styles.modalView} />
            <TouchableOpacity>
              <Text style={styles.modalText}>Alerts</Text>
            </TouchableOpacity>
            <View style={styles.modalView} />
            <TouchableOpacity>
              <Text style={styles.modalText}>Menu Item Three</Text>
            </TouchableOpacity>
            <View style={styles.modalView} />
            <TouchableOpacity>
              <Text style={styles.modalText}>Menu Item Four</Text>
            </TouchableOpacity>
            <View style={styles.modalView} />
            <TouchableOpacity>
              <Text style={styles.modalText}>Menu Item Five</Text>
            </TouchableOpacity>
            <View style={styles.modalView} />
            <TouchableOpacity>
              <Text style={styles.modalText}>Sign Out</Text>
            </TouchableOpacity>
            <View style={styles.modalView} />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  button: {},
  buttonText: {},
  hamburger: {
    borderBottomColor: "#3a454c",
    borderBottomWidth: 3,
    width: 30,
    padding: 2,
    position: "relative",
    right: 20,
    top: 12,
  },
  modal: {
    backgroundColor: "#3a454c",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 4,
    borderColor: "#59646b",
    borderRadius: 10,
    width: 180,
    position: "absolute",
    right: -6,
    top: 20,
    height: 300,
  },
  modalView: {
    borderBottomColor: "#59646b",
    borderBottomWidth: 1,
    width: 170,
    position: "relative",
    left: -9,
    bottom: 10,
  },
  modalText: {
    fontFamily: "bold",
    color: "#fff",
    padding: 4,
    marginTop: 4,
    marginBottom: 10,
    textAlign: "right",
  },
});
