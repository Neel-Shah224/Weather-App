const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2hhaG5lZWwyMjQiLCJhIjoiY2twcGZsNGRrMHV6aDMxcDQ4ajdmNWxsMCJ9.b9pwqfhy70srR7hRXBEBjQ'

    request({url , json:true },(error,{body}) => {
        
        if(error){
            callback('Unable to Connect to internet',undefined)
        }
        else if(body.features.length === 0){
            callback('Unable to find Location . Try Another one',undefined)
        }
        else{
            callback(undefined,{
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geocode