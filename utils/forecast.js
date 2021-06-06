const request = require('request')

const forecast = (longitude, latitude, callback) => {
   const url2 = `https://api.darksky.net/forecast/57f52dff1edea1b216cb8dfb27add740/${latitude},${longitude}`
   const url = `http://api.weatherstack.com/current?access_key=e523f888d252a04290896124bce90c9a&query=${latitude},${longitude}&units=f`
    const darkSky = []
//destructuring response 

/*request({ url2, json: true }, (error, {body}) => {
    if (error) {
        callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
        callback('Unable to find location', undefined)
    } else {
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
    }
})*/
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body.current)
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + 
            " degress out. It feels like " + body.current.feelslike + " degress out. The humidity is " + body.current.humidity + "%.")}

    })
}
module.exports = forecast