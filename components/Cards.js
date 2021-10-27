import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

export const Cards = ({ data }) => {
  //const image = { uri: "https://reactjs.org/logo-og.png" };
  return (
    <View style={style.box}>
      {data.slice(0, 10).map((e, idx) => {
        let image = { uri: e.image };
        return (
          <View style={style.cont} key={idx}>
            <Text style={style.title}>{e.title}</Text>
            <Text style={style.body}>
              {e.price.split(" ")}
              {"\n"}
              {e.location.trim()}
              {"\n"}
              <Text style={{ fontSize: 12 }}>{e.time}</Text>
            </Text>
            <ImageBackground
              source={image}
              resizeMode="cover"
              style={style.image}
            ></ImageBackground>
          </View>
        );
      })}
    </View>
  );
};

const style = StyleSheet.create({
  cont: {
    width: "95%",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    height: 300,
    backgroundColor: "#000",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: "auto",
    justifyContent: "center",
    paddingTop: "auto",
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },
  body: {
    fontSize: 16,
    color: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: -10,
    overflow: "hidden",
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
  },
});
