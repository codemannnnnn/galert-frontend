import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

import { authMiddleware } from "../utils/auth.js";

import * as Keychain from "react-native-keychain";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

//global state

export const Login = () => {
  const [authToken, setAuthToken] = useState({});
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");
  const [userToken, setUserToken] = useState("");

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
    return saveUserCreds(creds, userToken);
  };

  async function saveUserCreds(creds, token) {
    const { username, password } = creds;
    const usernameAndToken = `${username}, ${token}`;
    await SecureStore.setItemAsync(username, usernameAndToken);
  }

  async function getUserCreds(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      alert("🔐 Here's your value 🔐 \n" + result);
    } else {
      alert("No values stored under that key.");
    }
  }
  console.log(userToken);
  //   getUserCreds(userName);

  return (
    <View>
      <Text>Login Info</Text>
      <TextInput
        style={style.input}
        placeholder={"Username..."}
        onChangeText={setUserName}
      ></TextInput>
      <TextInput
        style={style.input}
        placeholder={"Password..."}
        onChangeText={setPass}
      ></TextInput>
      <View style={style.button}>
        <Button title="Submit" onPress={() => handleSubmit(userName, pass)} />
        <Button title="Show password" onPress={() => getUserCreds(userName)} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
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
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 6,
    borderColor: "#3a454c",
  },
});
