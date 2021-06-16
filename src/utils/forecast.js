const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=7ed97bf1c5dda83046083c13550258d8&query='+latitude+','+longitude
    request({url, json:true}, (error,{body})=>{
        if(error){
           callback('unable to connect to internet!',undefined)
        }
        else if(body.error){
            callback('incorrect Coordinates try another one',undefined)
        }
        else{
            
            callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. it feels like '+body.current.feelslike)
        
        }
        
    })
}
module.exports = forecast
