const request = require('request')
let access_token = 'access_token=pk.eyJ1IjoiZ2h4b3N0IiwiYSI6ImNrODgzbGVldTA0bWkzam8xY213anZtcXMifQ.k2Io7wZ6iKxHtsmcVt-tPg&limit=1'
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?'+access_token
    request({
    url,
    json: true
     //destructuring response
    }, (err, {body}) => {
        if (err) {
            callback('Unable to connect to Location Services', undefined)
           
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
            latitude: body.features[0].center[0],
            longitude: body.features[0].center[1],
            location: body.features[0].place_name
            })       
            }    
        })
    }

    module.exports = geocode