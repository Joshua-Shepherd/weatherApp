//imports for testing
const chance = require('chance').Chance() //Chance for random data generation
const shuffle = require('shuffle-array')
const express = require('express')
const app = express()

app.use(express.static('public'))

//random data
const data = {
    headers: ["Location", "Degree", "Forcast"],
    rows: new Array(10).fill(undefined).map(() =>{
        return [
            chance.country({full: true}),
            chance.integer({min:32 , max:120}),
            chance.paragraph({sentences: 3})
        ]
    })
}
let date = new Date().toISOString()
app.get('/data', (req,res) => {
    //res.send(data)
    res.json({
        headers: data.headers,
        rows: shuffle(data.rows),
        lastUpdated: new Date().toISOString()
    })
})

app.listen(3001, () => { console.log('App started on port: 3001')}) 