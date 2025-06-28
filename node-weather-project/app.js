const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  const query = req.body.cityName;
  const apiKey = process.env.apiKey;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q= " +
    query +
    "&appid=" +
    apiKey;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      // const icon = weatherData.weather[0].iconconst imageUrl =
      res.write(
        "<p> The weather is Currently  " + weatherDescription + " </p>"
      );
      res.write(
        "<h1> The Temperature in " +
          query +
          "is " +
          temp +
          "degree celsius </h1>"
      );
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
