const path = require('path') //use path module to manipulate paths
const express = require('express')
const axios = require('axios');
const hbs = require('hbs')
const app = express()
const forecast = require('../utils/forecast.js')
const geocode = require('../utils/geocode.js')
const darkSky = require('../utils/darkSky.js')
const dbconfigDev = require('./config/db.config.js')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000  //env port OR 3000 if none

// Define paths for express & HBS config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//set express to use a view engine called handlebars, a special version made express called hbs
app.set('view engine', 'hbs')
//Handlebars directory path set
app.set('views', viewsPath)
//static webpages
app.use(express.static(publicDir)) //Automatically goes to root because index.html
app.use(express.urlencoded({ extended: true}))
// body parser content type = application/json
app.use(express.json())
require('./routes/routes')(app)
//hbs set the partials path
hbs.registerPartials(partialsPath)



app.get('', (req,res)=>{
    res.render('index', {
        title: 'Stormlite Weather',
        author: 'Josh'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        author:"Josh",
        Location: "Austin, TX",
        title: "About me"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        HelpText:"HelpFul Text",
        author:"Josh",
        title: 'Help Page'
    })
})

//Sub help page not found
app.get('/help/*', (req,res)=>{
    res.render('404',{"404Error":"Help Article not Found",title:"404",author:"Josh" })
})

app.get('/weather', (req,res) => {
    //!req.query.address ? res.send({ERROR: "No Addess entered"}) :
    if(!req.query.address){
         res.send({ERROR: "No Addess entered"})
    }else if(req.query.address){

    geocode(req.query.address, ( error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error})//console.log(err)
        }
    
    //log and lat fed back from res.body geocode.js
    //Refactoring data.latitude, data.longitude to destructured

    darkSky(latitude, longitude, (error, dataDS) => {
        //combine darksky and weatherstack 
     forecast(latitude, longitude, (error, dataF,dataFdegree) => {
        if(error){
            return res.send({error})
        }
        res.send({
            location:location,
            forecast: dataF,
            latitude:latitude,
            longitude: longitude,
            forecastDarkSky: dataDS
        })
        //Auto log new forcast
        const axios = require('axios');
        var data = JSON.stringify({
          "location": location,
          "degrees": dataFdegree,
          "forcast": dataF
        });
        
        var config = {
          method: 'post',
          url: process.env.DEV_URL || process.env.STORMLITE_API,
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log('Forcast recorded!');
        })
        .catch(function (error) {
          console.log(error);
        });
        
         
       })
    })
      
    })
    
}

})


//MongoDB setup
mongoose.Promise = global.Promise

//initate the connection
let urlAtlas = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PW}@${process.env.ATLAS_URL}?retryWrites=true&w=majority`
mongoose.connect(urlAtlas, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() =>{
    console.log('Database connection successful')
}).catch(err => {
    console.log('Could not connect')
    console.log(err)
    process.exit()
})


// app.post('/api/postWeather', (req, res) =>{
    
// })

//404 req
app.get('*', (req,res) =>{
res.render('404',{"404Error":"This page was not found",title:"404",author:"Josh" })
})

app.listen(port, () =>{
    console.log('Server is running on port ' + port)
})
