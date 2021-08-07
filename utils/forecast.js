const request = require('request')
const dote = require('dotenv')
dote.config({path: './src/config/config.env'})

const forecast = (longitude, latitude, callback) => {
   const url = `http://api.weatherstack.com/current?access_key=`+process.env.WEATHER_STACK_KEY+`&query=${latitude},${longitude}&units=f`
  

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            
           
            callback(undefined,'Obeservation Time: ' + body.current.observation_time + ' -- ' + 'Wind Speed & Direction: ' + body.current.wind_dir + ' ' 
            + body.current.wind_speed + 'mph  Cloudcover: ' + body.current.cloudcover + '%  --' + ' Looks like: ' + body.current.weather_descriptions[0] + '-- Precipitation: '
            + body.current.precip + ". It is currently " + body.current.temperature +  " degress out. It feels like " + body.current.feelslike + 
            " degress out. The humidity is " + body.current.humidity + "%.",body.current.temperature)}
    })  

}

    

module.exports = forecast