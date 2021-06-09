const request = require('request')

const forecast = (longitude, latitude, callback) => {
   const url = `http://api.weatherstack.com/current?access_key=e523f888d252a04290896124bce90c9a&query=${latitude},${longitude}&units=f`
   //const darkSky = []
//destructuring response 
// var options = {
//     method: "GET",
//     url: `https://api.darksky.net/forecast/57f52dff1edea1b216cb8dfb27add740/${latitude},${longitude}`,
//     json:true
// }

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            
           
            callback(undefined,'Obeservation Time: ' + body.current.observation_time + ' -- ' + 'Wind Speed & Direction: ' + body.current.wind_dir + ' ' 
            + body.current.wind_speed + 'mph  Cloudcover: ' + body.current.cloudcover + '%  --' + ' Looks like: ' + body.current.weather_descriptions[0] + '-- Precipitation: '
            + body.current.precip + ". It is currently " + body.current.temperature +  " degress out. It feels like " + body.current.feelslike + 
            " degress out. The humidity is " + body.current.humidity + "%.")}
    })   
}

    

module.exports = forecast