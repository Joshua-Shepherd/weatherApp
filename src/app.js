const path = require('path') //use path module to manipulate paths
const express = require('express')
const axios = require('axios');
const hbs = require('hbs')
const app = express()
const dbconfigDev = require('./config/db.config.js')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000  //env port OR 3000 if none

// Define paths for express & HBS config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
console.log('Server side JS')
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

//Static Routes
    //Forcast Search -- Home page
    app.get('/', (req,res)=>{ res.render('index', { title: 'Stormlite Weather', author: 'Josh' }) })
    //About page
    app.get('/about', (req,res)=>{ res.render('about', { author:"Josh", Location: "Austin, TX", title: "About me" }) })
    //Help Page
    app.get('/help', (req,res)=>{ res.render('help', { HelpText:"HelpFul Text", author:"Josh", title: 'Help Page' }) })
    //Forcast History page 
    app.get('/4castHistory', (req,res)=>{ res.render('4castHistory', {forecastText:"Search by City", author:"Josh",title: 'Forecast History' }) })
    //Bootstrap testpage
    app.get('/boot', (req,res)=>{ res.render('bootstrapTest')})    
    //Sub help page not found
    app.get('/help/*', (req,res)=>{ res.render('404',{"404Error":"Help Article not Found",title:"404",author:"Josh" }) })
    //404 req
    app.get('*', (req,res) =>{ res.render('404',{"404Error":"This page was not found",title:"404",author:"Josh" }) })



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


//Webserver Listener
app.listen(port, () =>{
    console.log('Server is running on port ' + port)
})
