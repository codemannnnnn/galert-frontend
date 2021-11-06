const axios = require("axios");
const cheerio = require("cheerio");

const link =
  "https://www.armslist.com/posts/13609481/missoula-montana-shotguns-for-sale--remington-v3-tac-13";

const cook =
  "listmill_auth=DBD7E2082DE5D2D9C1144D08BB740B3E26107CFBD5AB1FFBE5FAE9CACDC688C5585F3BDA4F8D7EF3FF72052AE3E0A772C69C8309C736CE2A320A93ABB17D07DA74B8C5E8DAC5CD00FD7F1B5F0B9386B8C9D5E780CBC47FD0848EAE5EE0E1CA60428D7A6DB09F3C3137D799E3E025EB119473FC72";

const auth = {
  headers: {
    Cookie: cook,
  },
};

axios
  .get(
    "https://www.armslist.com/posts/13614252/bozeman-montana-reloading-for-sale--212-grain-eld-x"
  )
  .then((res) => {
    console.log(res.headers);
  });

// const pull = async () => {
//   const fetchIt = async (url) => {
//     const { data } = await axios.get(url, auth);
//     return cheerio.load(data);
//   };
//   const $ = await fetchIt(link);

//   const itemInfo = $(".container-fluid")
//     .find(".row")
//     .find(".col-md-6")
//     .find(".text-holder")
//     .find(".postContent")
//     .text();

//   return console.log(itemInfo);
// };

// pull();
