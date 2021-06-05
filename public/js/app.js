//alert('Ugh oh Need help')
//console.log('Clientside JS')
const addressForm = document.querySelector('form')//target index.hbs <form> 
const search = document.querySelector('input') //Target Form input  index.hbs <input placeholder="Location, City, or ZIP">
const messageOne = document.querySelector('#inputLocation')//target 'id'  index.hbs <p id="inputLocation"> </p>
const messageTwo = document.querySelector('#inputForecast')//target 'id'  index.hbs <p id="inputForecast"> </p>



addressForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value  // console.log(location) = austin
    if(!location){
        messageOne.textContent= 'No Location Entered!'
        messageTwo.textContent = ''
    }else{
        //loading message
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast    
            //replace index.hbs <iframe src url for weather radar to update with searched location - This works 
           // document.querySelector('#weatherRadar').src=`https://embed.windy.com/embed2.html?lat=${data.latitude}&lon=${data.longitude}&detailLat=${data.latitude}&detailLon=${data.longitude}&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`
           // document.querySelector('#weatherRadar2').src=`https://embed.windy.com/embed2.html?lat=${data.latitude}&lon=${data.longitude}&detailLat=${data.latitude}&detailLon=${data.longitude}&width=950&height=650&zoom=7&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=24&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1`
           // console.log( `https://embed.windy.com/embed2.html?lat=${data.latitude}&lon=${data.longitude}&detailLat=${data.latitude}&detailLon=${data.longitude}&width=950&height=650&zoom=7&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=24&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1`)
        }
        //data.error ? console.log(data.error) :   
        })
    })
   }
})
/*<div>
             <iframe width="650" height="450" src="https://embed.windy.com/embed2.html?lat=30.377&lon=-97.710&detailLat=30.377&detailLon=-97.710&width=650&height=450&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1" frameborder="0"></iframe>
         </div>
    <div>
                <iframe id="weatherRadar2" width="950" height="650" src="https://embed.windy.com/embed2.html?lat=-97.7437&lon=30.2711&detailLat=-97.7437&detailLon=30.2711&width=950&height=650&zoom=7&level=surface&overlay=radar&product=radar&menu=&message=&marker=&calendar=24&pressure=&type=map&location=coordinates&detail=&metricWind=mph&metricTemp=%C2%B0F&radarRange=-1" frameborder="0"></iframe>

    </div>*/