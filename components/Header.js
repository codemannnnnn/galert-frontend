import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Menu } from "./Menu.js";
import { useFonts } from "expo-font";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [loaded] = useFonts({
    main: require("../assets/fonts/main.ttf"),
    bold: require("../assets/fonts/Oxygen-Bold.ttf"),
  });
  if (!loaded) {
    return null;
  }

  const handleSearchBox = () => {
    showSearch ? setShowSearch(false) : setShowSearch(true);
  };

  const handleSearch = (e) => {
    console.log("from search return");
  };
  return (
    <>
      <View style={style.box}>
        <View>
          <TouchableOpacity onPress={handleSearchBox}>
            <View>
              <FontAwesomeIcon
                icon={faSearch}
                style={style.searchIcon}
                size={25}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={style.header}>Gun Alert</Text>
        </View>
        <View>
          <Menu />
        </View>
      </View>

      {showSearch ? (
        <View>
          <TextInput
            style={style.input}
            placeholder={"Search..."}
            returnKeyType="search"
            onSubmitEditing={handleSearch}
          ></TextInput>
        </View>
      ) : (
        <Text></Text>
      )}
    </>
  );
};

const style = StyleSheet.create({
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "auto",
    width: "100%",
  },
  header: {
    fontSize: 40,
    color: "#3a454c",
    fontFamily: "bold",
    // display: "flex",
    // alignItems: "center",
    // margin: "auto",
  },
  deadSpace: {
    borderBottomColor: "#fff",
    borderBottomWidth: 3,
    width: 30,
    padding: 2,
    position: "relative",
    left: 20,
    top: 12,
  },
  searchIcon: {
    borderBottomColor: "#3a454c",
    borderBottomWidth: 3,
    color: "#3a454c",
    width: 30,
    padding: 10,
    position: "relative",
    left: 17,
    top: 14,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "#3a454c",
  },
});
