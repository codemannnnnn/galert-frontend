import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import axios from "axios";

//components
import { Header } from "./components/Header.js";
import { Cards } from "./components/Cards.js";

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const url = "https://galert-backend.herokuapp.com/arms/all";
  useEffect(() => {
    const grabIt = async () => {
      let pull = await axios
        .get(url)
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })

        .catch((err) => {
          console.log(err);
        });
    };
    grabIt();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />
        <Text>
          {isLoading ? (
            "Loading..."
          ) : (
            <Text>
              <Cards data={data.reverse()} />{" "}
            </Text>
          )}
        </Text>

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    margin: "auto",
    paddingTop: 50,
  },
  card: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    shadowColor: "black",
    shadowRadius: 1,
  },
  header: {
    // display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    margin: "auto",
  },
});
