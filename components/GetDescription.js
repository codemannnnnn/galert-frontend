import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import cheerio, { load } from "cheerio";
import axios from "axios";
// import dotenv from "dotenv";
// const dotenv = require("dotenv");
// dotenv.config();

export const GetDescription = ({ link }) => {
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const grabData = async () => {
      //   const { REACT_APP_COOKIE, REACT_APP_COOKIE2 } = process.env;
      //   const cookieArray = [REACT_APP_COOKIE, REACT_APP_COOKIE2];
      //   const randomGrabber = Math.floor(Math.random() * 2);
      //   const number = cookieArray[randomGrabber];
      //   const cook = `listmill_auth=${number}`;
      const cook2 =
        "listmill_auth=DBD7E2082DE5D2D9C1144D08BB740B3E26107CFBD5AB1FFBE5FAE9CACDC688C5585F3BDA4F8D7EF3FF72052AE3E0A772C69C8309C736CE2A320A93ABB17D07DA74B8C5E8DAC5CD00FD7F1B5F0B9386B8C9D5E780CBC47FD0848EAE5EE0E1CA60428D7A6DB09F3C3137D799E3E025EB119473FC72";

      //authorization headers setup with cookie
      const up = {
        headers: {
          Cookie: cook2,
        },
      };
      //with fetch
      //   const res = await fetch(link, up);
      //   const text = await res.text();
      //   const $ = cheerio.load(text);
      const fetchIt = async (url) => {
        const { data } = await axios.get(url, up);
        return cheerio.load(data);
      };
      console.log(link);
      const $ = await fetchIt(link);

      const itemInfo = $(".container-fluid")
        .find(".row")
        .find(".col-md-6")
        .find(".text-holder")
        .find(".postContent")
        .text();

      console.log("rerendinger");
      setDesc(itemInfo);
      setLoading(false);
    };

    grabData();
  }, [link]);

  {
    return loading ? (
      "Loading..."
    ) : (
      <Text>
        {"\n"}
        {desc}
      </Text>
    );
  }
};
