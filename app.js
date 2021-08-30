const express = require("express");  //express
const https = require("https");      //https for making requets to api
const ejs = require("ejs");          // for ejs templating
const bodyParser = require("body-parser");  //for parsing requests recieved via app.post

require("dotenv").config() ;                     // This is for storing API Keys in a separate environment file .env  
             

app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));  //linking bodyparser with express
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");  //sending html file for rendering
});

app.get("/home", function(req, res){
  data = {
    image : "overcast.jpg"
  }
  res.render("home", {data: data});
});

app.post("/", function(req, res){
  const cityName = req.body.cityName;         //recieving cityName from form
  const appId = process.env.APP_ID;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appId+"&units="+units;  //this url will be used to call openweather api

  https.get(url, function(response){
    response.on("data", function(data){       //returns data in hexa-desimal format
        const weatherData = JSON.parse(data);   // to parse data in text format  //JSON.stringify(weatherData);     //This does opposite of JSON.parse this removes spaces and stringify weatherData

        const cityNameRec = weatherData.name;
        const temp = weatherData.main.temp ;
        const feelsLike = weatherData.main.feels_like;
        const description = weatherData.weather[0].description;
        const weatherIcon = weatherData.weather[0].icon;
        const weatherIconUrl = "http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png" ;
        res.write("<h1> The weather in "+ cityNameRec +" is " + temp + " degrees Celcius. </h1>");  // res.write() can wrap all things we want to send then calling res,send will send it.
        res.write("<h3> The weather feels like " + description + " </h3 >");
        res.write("<img src='" +weatherIconUrl+ "  '></img>");
        res.send();                                                                                ////Sending data to our client !!! Remember app.get can have single res.send
    });
  });
});



app.listen(8000, function(){
  console.log("Server is running on port 8000");
});
