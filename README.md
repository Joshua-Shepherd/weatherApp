# weatherApp
Stormlite Weather APP

Simple CRUD Api using ExpressJS and MongoDB.

Visit: https://stormlite.herokuapp.com/ and use the search to pull the current weather alerts, and forcasts for your City. 

The Api portion of the app exists on the following endpoints:

GET: https://stormlite.herokuapp.com/api/weatherApi - Get All forcasts

GET: https://stormlite.herokuapp.com/api/weatherApi/:forcastId - Get a Single forcast

POST: https://stormlite.herokuapp.com/api/weatherApi - Body: { "location": String, "degrees": Number, "forcast": String }

UPDATE: https://stormlite.herokuapp.com/api/weatherApi/:forcastId - Body: { "location": "Austin, Texas", "degrees": 93.67, "forcast": "forcast" }

DELETE: https://stormlite.herokuapp.com/api/weatherApi/:forcastId

