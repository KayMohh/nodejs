const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//body parser to grab info coming from html
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //   res.send("hello world");
  res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res) => {
  let num1 = Number(req.body.num1);
  let num2 = Number(req.body.num2);

  let result = num1 + num2;

  res.send("THe result of the calculation is " + result);
});

app.get("/bmicalculator", (req, res) => {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", (req, res) => {
  let weight = parseFloat(req.body.weight);
  let height = parseFloat(req.body.height);

  let bmi = weight / (height * height);

  res.send("Your BMI is " + bmi.toFixed(3));
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
