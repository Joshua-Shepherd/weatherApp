
module.exports = (app) => {
    const geocode = require('../routes/geocode')
    const forecast = require('../routes/forecast')
    const darkSky = require('../routes/darkSky')
    const forcasts = require('../controllers/forcastController.js')
    //Api Routes
    app.post('/api/weatherApi',forcasts.create) //Create forcast
    app.get('/api/weatherApi',forcasts.findAll) //GET all forcasts
    app.get('/api/weatherApi/:forcastId',forcasts.findOne) //GET one forcast
    app.get('/api/weatherHistory',forcasts.queryOne) //Query one forcast history
    app.put('/api/weatherApi/:forcastId',forcasts.update) //Update one forcast
    app.delete('/api/weatherApi/:forcastId',forcasts.delete) //Delete one forcast

    
    //Api query routes
    //forcast History Query Route
    app.get('/api/weatherHistoryApi', (req,res) =>{
        if(!req.query.cityName){
            res.send({ERROR: "No City entered"})
        }else if(req.query.cityName){ 
            res.send({message: 'Query Successful'})
        } })

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
            const axios = require('axios');
            var data = JSON.stringify({
              "location": location,
              "degrees": dataFdegree,
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
            }); }) }) }) } })
}