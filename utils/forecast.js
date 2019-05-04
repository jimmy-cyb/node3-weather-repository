const request = require('request');

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/3b3bb29b346d9c701f076ca19ec8ee96/'+latitude+','+longitude;
    request({url,json:true},(error,{body})=> {
       if(error) {
           callback('Not connected to internet',undefined);
       }
       else if(body.error) {
           callback('One/more arguments values was not provided');
       }
       else {
           callback(undefined,{
               temperature: body.currently.temperature,
               chanceOfRain: body.currently.precipProbability
           })
       }
    })
}
module.exports = forecast;
