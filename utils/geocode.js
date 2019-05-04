const request = require('request');
const geocode=(address,callback)=>{
    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYWJoaXlhc2hkZXZpbCIsImEiOiJjanV3eXJ4MGowNXl1NDRtbjgwdHN0cHBmIn0.Z2hdEY5UZQJPZPnliLc93g';
    request({url,json:true},(error,{body}={})=>{
      if(error) {
        callback("Can't connect to internet");
      }
      else if(body.message || body.features.length === 0){
        callback("Can't find location. Try another search");
      }
      else {
        callback(undefined,{
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          placename: body.features[0].place_name,         
        })
      }
    })
  }
  module.exports=geocode;