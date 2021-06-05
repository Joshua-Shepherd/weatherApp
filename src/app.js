const path = require('path') //use path module to manipulate paths
const express = require('express')
const hbs = require('hbs')
const app = express()
const forecast = require('../utils/forecast.js')
const geocode = require('../utils/geocode.js')

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
//hbs set the partials path
hbs.registerPartials(partialsPath)



app.get('', (req,res)=>{
    res.render('index', {
        title: 'weather app home',
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
    forecast(latitude, longitude, (error, dataF) => {
        if(error){
            return res.send({error})
        }
        res.send({
            location:location,
            forecast: dataF,
            latitude:latitude,
            longitude: longitude
        })
    
      })
      console.log({latitude, longitude, location})
    })
}

})

app.get('*', (req,res) =>{
res.render('404',{"404Error":"This page was not found",title:"404",author:"Josh" })
})

app.listen(3000, () =>{
    console.log('Server is running on port 3000')
})
//<h1></h1>