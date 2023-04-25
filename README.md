
## Stormlite WeatherApp
Built using WeatherStack API and Darksky in combination with MapBox Api for Geocoding
simply type in your city, and search to retrieve the weather.

Stormlite uses a Mongo ATLAS DB and thus needs to be connected to one in order to 
store and retrieve forcasts. 

Using DotEnv, you can create a config folder with a config.env file that contains the following:
```env
MONGO_DB_USER= The User the app will utilize to access the DB. Needs Read and Write permissions
MONGO_DB_PW= password of the user
ATLAS_URL= Your MongoDB Atlas Cluster Url. For Example: cluster-googlecloud.tpzi4.mongodb.net/DatabaseName
WEATHER_STACK_KEY= WeatherStack API Key - https://weatherstack.com/product Free:250 calls per Month
GEOCODE_TOKEN= MapBox Api key - https://docs.mapbox.com/api/overview/
DEV_URL=http://localhost:3000/api/weatherApi/
STORMLITE_FETCH=http://localhost:3000/api/weatherHistory?cityName
```

## Stormlite WeatherApi 
Using ExpressJS and MongoDB.

Visit: https://stormlite.herokuapp.com/ and use the search to pull the current weather alerts, and forcasts for your City. 

The Api portion of the app exists on the following endpoints:

`GET: https://stormlite.herokuapp.com/api/weatherApi` - Get All forcasts

`GET: https://stormlite.herokuapp.com/api/weatherApi/:forcastId` - Get a Single forcast

`POST: https://stormlite.herokuapp.com/api/weatherApi` 
- response: 
```JSON 
{ "location": String, "degrees": Number, "forcast": String }
```
`UPDATE: https://stormlite.herokuapp.com/api/weatherApi/:forcastId` 
- response: 
```JSON 
{ "location": "Austin, Texas", "degrees": 93.67, "forcast": "forcast" }
```
`DELETE: https://stormlite.herokuapp.com/api/weatherApi/:forcastId`

