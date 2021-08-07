const request = require('request')

const darkSky = ( longitude,latitude, callback) => {
    const url2 =`https://api.darksky.net/forecast/57f52dff1edea1b216cb8dfb27add740/${latitude},${longitude}`

    request({
        url: url2,
        json: true
      },(error,{body}) => {
          if(error){
            callback('Unable to connect to darkSky service!',undefined)
          }else if(body.alerts === undefined){
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.' )
            //console.log(body)
          }else{
            
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.' +'\n' +
              'Weather Alerts: ' + '\n' + body.alerts[0].title +  '\n' + body.alerts[0].description)
             // console.log(body)
          }
        //console.log(body)
      })
}

    

module.exports = darkSky