const express = require("express");  //express
const https = require("https");      //https for making requets to api
const ejs = require("ejs");          // for ejs templating
const bodyParser = require("body-parser");  //for parsing requests recieved via app.post
const dateProvider = require(__dirname + "/date.js")   // fore getting date in string format
require("dotenv").config() ;                     // This is for storing API Keys in a separate environment file .env  

app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));  //linking bodyparser with express
app.set("view engine", "ejs");

app.get("/", function(req, res){
  const cityName = "Delhi";     
  const appId = process.env.APP_ID;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appId+"&units="+units;  //this url will be used to call openweather api

  https.get(url, function(response){
    response.on("data", function(data){       //returns data in hexa-desimal format
        const weatherData = JSON.parse(data);   // to parse data in text format  //JSON.stringify(weatherData);     //This does opposite of JSON.parse this removes spaces and stringify weatherData
        weatherData['date']=dateProvider.getDate();
        if (weatherData.cod == 200){
          res.render("home", weatherData);  
        }else{
          res.render("not-found");
        }
    });
  });
});

app.post("/", function(req, res){
  const cityName = req.body.cityName;         //recieving cityName from form
  const appId = process.env.APP_ID;
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appId+"&units="+units;  //this url will be used to call openweather api

  https.get(url, function(response){
    response.on("data", function(data){       //returns data in hexa-desimal format
        const weatherData = JSON.parse(data);   // to parse data in text format  //JSON.stringify(weatherData);     //This does opposite of JSON.parse this removes spaces and stringify weatherData
        weatherData['date']=dateProvider.getDate();
        if (weatherData.cod == 200){
          res.render("home", weatherData);  
        }else{
          res.render("not-found");
        }
    });
  });
});



app.listen(8000, function(){
  console.log("Server is running on port 8000");
});
