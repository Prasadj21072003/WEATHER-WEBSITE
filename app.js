const express = require("express");
const body = require("body-parser");
const https = require("https");
const app = express();
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

app.set("view engine", "ejs");

app.use(body.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("list");
});

app.post("/", function (req, res) {
  console.log("post request recieved");
  var input = req.body.cityname;
  var inputcity = input.toUpperCase();
  const url =
    process.env.APP_URL +
    input +
    "&appid=" +
    process.env.APP_ID +
    "&units=metric";

  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      console.log(weatherdata);
      const temp = Math.round(weatherdata?.main.temp);
      const pressure = weatherdata?.main.pressure;
      const humidity = weatherdata?.main.humidity;
      res.render("list", {
        CITYNAME: inputcity,
        title: temp,
        PRESSURE: pressure,
        HUMIDITY: humidity,
      });
      console.log(temp);
    });
  });
});

app.listen(3000, function () {
  console.log("server is running");
});
