import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Touchable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
} from "react-native";
import cheerio, { load } from "cheerio";
import axios from "axios";

import { GetDescription } from "./GetDescription";

//bring in the data for testing
//import { data } from "../dummyData/arms.js";

export const Flatlist = ({ data }) => {
  const [infoLoading, setInfoLoading] = useState(true);
  const [moreInfo, setMoreInfo] = useState("");
  const [curItem, setCurItem] = useState("");
  const [loading, setLoading] = useState(true);

  const Item = ({ title, price, location, time, image, item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.body}>
          {price.split(" ")}
          {"\n"}
          {location.trim()}
          {"\n"}
          <Text style={{ fontSize: 12 }}>{time}</Text>
          {"\n"}
          <Text onPress={() => Linking.openURL(item.link)}>More info</Text>
        </Text>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
    );
  };

  const Button = (item) => {
    return (
      <>
        <TouchableWithoutFeedback onPress={() => getMoreInfo(item)}>
          <Text>Load more up</Text>
        </TouchableWithoutFeedback>
        <Text>
          {infoLoading ? (
            ""
          ) : (
            <Text styles={styles.body}>
              {" "}
              {item.id === curItem ? <GetDescription link={item.link} /> : ""}
              {/* {console.log({ item })}
              {console.log({ curItem })} */}
              {/* {item.time}
              {console.log(item.id)} */}
            </Text>
          )}
        </Text>
      </>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <Item
          title={item.title}
          price={item.price}
          location={item.location}
          time={item.time}
          image={item.image}
          item={item}
        />
      </>
    );
  };

  const footerComp = () => {
    return <Text>Footer Baby</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        initialNumToRender={3}
        ListFooterComponent={footerComp}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#3a454c",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 4,
    borderColor: "#59646b",
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#fff",
  },
  body: {
    fontSize: 16,
    color: "#fff",
  },
  image: {
    height: 180,
    width: 335.6,
    resizeMode: "contain",
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: -10,
    overflow: "hidden",
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  count: {
    fontSize: 100,
    color: "black",
  },
});
