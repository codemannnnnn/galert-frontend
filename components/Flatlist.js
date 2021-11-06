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
// import FontAwesome, {
//   SolidIcons,
//   RegularIcons,
//   BrandIcons,
// } from "react-native-fontawesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import cheerio, { load } from "cheerio";
import axios from "axios";

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
          <View style={styles.splitem}>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: "#fff",
                  paddingTop: 4,
                  fontStyle: "italic",
                }}
              >
                {time}
              </Text>
              <View style={{ position: "relative", top: 10 }}>
                <Text
                  onPress={() => Linking.openURL(item.link)}
                  style={{ padding: 10 }}
                >
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    style={{ color: "#fff" }}
                  />
                </Text>
              </View>
            </View>

            <View>
              <TouchableOpacity onPress={() => handleMore(item)}>
                <Text style={styles.info}>
                  {curItem === item.id
                    ? loading
                      ? "Show More"
                      : "Show Less"
                    : "Show More"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text>
            {loading ? (
              ""
            ) : curItem === item.id ? (
              <Text style={styles.description}>
                {"\n"}
                {item.description}
              </Text>
            ) : (
              ""
            )}
          </Text>
        </Text>

        <View style={styles.imgBox}>
          <Image source={{ uri: image }} style={styles.image} />
        </View>
      </View>
    );
  };

  const handleMore = async (item) => {
    setCurItem(item.id);
    // setMoreInfo(itemInfo);
    {
      loading ? setLoading(false) : setLoading(true);
    }
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
  // imgBox: {
  //   width: "auto",
  //   height: "auto",
  // },
  image: {
    width: undefined,
    height: 230,
    resizeMode: "cover",
    marginTop: 6,
    marginLeft: -10,
    marginRight: -10,
    marginBottom: -10,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
  },
  count: {
    fontSize: 100,
    color: "black",
  },
  description: {},
  info: {
    borderColor: "#fff",
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    position: "relative",
    bottom: 15,
    color: "#fff",
  },
  splitem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: -6,
  },
});
