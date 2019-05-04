const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const request = require('request');
const path= require('path');
const express = require('express');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const app= express();
const viewPath=path.join(__dirname, './templates/views');

//Setting up hbs and views directory path
app.set('view engine','hbs')
app.set('views',viewPath )
hbs.registerPartials(path.join(__dirname, './templates/partials'))

//Serving static files via express
app.use(express.static(path.join(__dirname, './public')));

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Abhiyash'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Abhiyash'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help required',
        name:'Abhiyash',
        title:'Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'No address provided'
        });
    }
    geocode(req.query.address,(error, {latitude,longitude,placename}={})=>{
        if(error){
          return res.send({
            error
        });
        }
        forecast(latitude,longitude,(forecasterror,forecastresponse)=> {
          if(forecastresponse)
          {
            // console.log(placename);
            // console.log("It is currently "+ forecastresponse.temperature +" degrees out. There is a "+ forecastresponse.chanceOfRain +"% chance of rain");
            res.send({
                location: placename,
                forecast: "It is currently "+ forecastresponse.temperature +" degrees out. There is a "+ forecastresponse.chanceOfRain +"% chance of rain. Maximum temp: "+forecastresponse.tempHigh+" Min temp: "+forecastresponse.tempLow
            });  
        }
          else {
            return res.send({
                error: forecasterror
            });
          }
        });
      });
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        error: 'Help page not found',
        title: '404',
        name: 'Abhiyash'
    })
})

app.get('*',(req,res)=>{
   res.render('error',{
       error: 'Page not found',
       title: '404',
       name: 'Abhiyash'
   });
})

app.listen(port, (req,res)=>{
    console.log("Server started on port "+port)
})