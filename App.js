import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
//import { Button } from "react-native-elements/dist/buttons/Button";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { userInformation } from "./components/Login.js";

//components
import { Header } from "./components/Header.js";
import { Cards } from "./components/Cards.js";
import { Flatlist } from "./components/Flatlist.js";
import { Login } from "./components/Login.js";

//auth
import { authMiddleware } from "./utils/auth.js";
import * as SecureStore from "expo-secure-store";

export default function App() {
  //data state
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  //login state
  const [showLogin, setShowLogin] = useState(true);
  const [authToken, setAuthToken] = useState({});
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [userToken, setUserToken] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [usernameConstant, setUsernameConstant] = useState("");
  const [autoLogin, setAutoLogin] = useState(true);
  const [userID, setUserID] = useState("");

  //vars
  const loginUrl = "https://galert-backend.herokuapp.com/auth/login";
  const handleSubmit = async (us, pw) => {
    const creds = {
      username: us,
      password: pw,
    };
    await axios
      .post(loginUrl, creds)
      .then((res) => {
        setUserToken(res.data.token);
      })
      .catch((err) => {
        console.log(err.message);
      });
    return saveUserCreds(creds);
  };

  const autoLoginFunc = async () => {
    const username = await AsyncStorage.getItem("username");
    const password = await AsyncStorage.getItem("password");
    await axios
      .post(loginUrl, {
        username: username,
        password: password,
      })
      .then((res) => {
        setUserID(res.data.id);
        setUserToken(res.data.token);
        setAutoLogin(true);
        setUsernameConstant(username);
        setValidToken(true);
        setShowLogin(true);
      })
      .catch((err) => {
        console.log(err.message);
        setShowLogin(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    autoLoginFunc();
  }, []);

  async function saveUserCreds(creds) {
    const { username, password } = creds;
    await SecureStore.setItemAsync(username, password);
    await AsyncStorage.setItemAsync("id", userID);
    await AsyncStorage.setItem("username", username);
    await AsyncStorage.setItem("password", password);
    setUsernameConstant(username);
    setValidToken(true);
    setShowLogin(false);
  }

  async function getUserCreds(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert("No values stored under that key.");
    }
  }

  //data pull and rendering
  const dataUrl = "https://galert-backend.herokuapp.com/arms/all";
  useEffect(() => {
    const grabIt = async () => {
      let pull = await axios
        .get(dataUrl, {
          headers: {
            authorization: userToken,
          },
        })
        .then((res) => {
          setData(res.data);
          setIsLoading(false);
        })

        .catch((err) => {
          console.log(err);
        });
    };
    validToken ? grabIt() : "User not allowed yet.";
  }, [validToken]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header userInfo={usernameConstant} />
      </View>

      {autoLogin && showLogin ? (
        <Text>
          {/* <ActivityIndicator size="large" color={"#3a454c"} /> */}
        </Text>
      ) : (
        <View>
          <TextInput
            style={styles.input}
            placeholder={"Username..."}
            onChangeText={setUserName}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder={"Password..."}
            onChangeText={setPass}
          ></TextInput>
          <View style={styles.button}>
            <Button
              title="Submit"
              color="#fff"
              onPress={() => handleSubmit(userName, pass)}
            />
          </View>
        </View>
      )}

      <Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={"#3a454c"} />
        ) : (
          <Flatlist data={data.reverse()} />
          // <Text>
          //   <Cards data={data.reverse()} />{" "}
          // </Text>
        )}
      </Text>

      <StatusBar style="auto" />
    </View>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    width: "100%",
    zIndex: 10,
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
  button: {
    borderWidth: 1,
    borderColor: "#59646b",
    borderRadius: 6,
    width: 300,
    height: 40,
    margin: 12,
    backgroundColor: "#3a454c",
  },
});
