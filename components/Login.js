import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";

import { authMiddleware } from "../utils/auth.js";

export const Login = () => {
  const [authToken, setAuthToken] = useState({});
  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  const handleSubmit = (us, pw) => {
    const creds = {
      username: us,
      password: pw,
    };
    return authMiddleware(creds);
  };

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
    backgroundColor: "black",
  },
});
