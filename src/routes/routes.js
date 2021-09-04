
module.exports = (app) => {
    const geocode = require('../routes/geocode')
    const darkSky = require('../routes/darkSky')
    const forecast = require('../routes/forecast')
    const forcasts = require('../controllers/forcastController.js')
    const axios = require('axios');

    //Api Routes
    app.post('/api/weatherApi',forcasts.create) //Create forcast
    app.get('/api/weatherApi',forcasts.findAll) //GET all forcasts
    app.get('/api/weatherApi/:forcastId',forcasts.findOne) //GET one forcast
    app.get('/api/weatherHistory',forcasts.queryOne) //Query one forcast history
    app.put('/api/weatherApi/:forcastId',forcasts.update) //Update one forcast
    app.delete('/api/weatherApi/:forcastId',forcasts.delete) //Delete one forcast
    


    //Bootstrap testpage
    app.get('/boot', (req,res)=>{ 
        let data = [{
            location: 'Austin, Texas, United States',
            degree: 95,
            forcast: 'Obeservation Time: 10:13 PM -- Wind Speed & Direction: SSW 8mph  Cloudcover: 50%  -- Looks like: Partly cloudy-- Precipitation: 0. It is currently 95 degress out. It feels like 104 degress out. The humidity is 43%.',
            date: '2021-08-07T22:16:34.791Z',
            createdAt: '2021-08-07T22:16:34.795Z',
            updatedAt: '2021-08-07T22:16:34.795Z'
          },{
            location: 'Austin, Texas, United States',
            degree: 95,
            forcast: 'Obeservation Time: 10:13 PM -- Wind Speed & Direction: SSW 8mph  Cloudcover: 50%  -- Looks like: Partly cloudy-- Precipitation: 0. It is currently 95 degress out. It feels like 104 degress out. The humidity is 43%.',
            date: '2021-08-07T22:16:34.791Z',
            createdAt: '2021-08-07T22:16:34.795Z',
            updatedAt: '2021-08-07T22:16:34.795Z'
          },{
            location: 'Austin, Texas, United States',
            degree: 95,
            forcast: 'Obeservation Time: 10:13 PM -- Wind Speed & Direction: SSW 8mph  Cloudcover: 50%  -- Looks like: Partly cloudy-- Precipitation: 0. It is currently 95 degress out. It feels like 104 degress out. The humidity is 43%.',
            date: '2021-08-07T22:16:34.791Z',
            createdAt: '2021-08-07T22:16:34.795Z',
            updatedAt: '2021-08-07T22:16:34.795Z'
          }]
        
        res.render('index.ejs', 
            { forecastText:"Search by City", title: 'Stormlite Weather', author: 'Josh', data:data})
    
    })
    //Api query routes
    //forcast History Query Route
    app.get('/api/weatherHistoryApi', (req,res) =>{
        if(!req.query.cityName){
            res.send({ERROR: "No City entered"})
        }else if(req.query.cityName){ 
          geocode(req.query.cityName, ( error, {latitude, longitude, location} = {} ) => {
                if(error){
                    return res.send({error})//console.log(err)
                }

                var config = {
                    method: 'get',
                    url:  process.env.STORMLITE_FETCH+location,
                    headers: { }
                  };
//                   2021-08-31T01:42:34.908451+00:00 app[web.1]: _currentUrl: 'http:undefinedAustin,%20Texas,%20United%20States',
//                     2021-08-31T01:42:34.908451+00:00 app[web.1]: [Symbol(kCapture)]: false
//                      2021-08-31T01:42:34.908451+00:00 app[web.1]: },
                  axios(config)
                  .then(function (response) {
                    res.send(JSON.stringify(response.data));
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }) 
        }
     })
      
        //Forcast Search Route
    app.get('/weather', (req,res) => {
        if(!req.query.address){
            res.send({ERROR: "No Addess entered"})

        }else if(req.query.address){

            //Refactoring data.latitude, data.longitude to destructured
        geocode(req.query.address, ( error, {latitude, longitude, location} = {} ) => {
            if(error){
                return res.send({error})//console.log(err)
            }

        darkSky(latitude, longitude, (error, dataDS) => { //log and lat fed back from res.body geocode.js
            //combine darksky and weatherstack 
            if(error){
                return res.send({error})
            }

        forecast(latitude, longitude, (error, dataF,dataFdegree) => {
            if(error){
                return res.send({error})
            }
            res.send({
                location:location, forecast: dataF, latitude:latitude, longitude: longitude, forecastDarkSky: dataDS
            })
            //Auto log new forcast
            
            var data = JSON.stringify({
              "location": location,
              "degree": dataFdegree,
              "forcast": dataF });
          
            var config = {
              method: 'post',
              url: process.env.DEV_URL || process.env.STORMLITE_API,
              headers: { 
                'Content-Type': 'application/json' },
              data : data };
            
        axios(config)
            .then(function (response) {
              console.log('Forcast recorded!'); })
            .catch(function (error) {
              console.log(error);
            })
         })
      })   
    }) 
   } 
  })
 }