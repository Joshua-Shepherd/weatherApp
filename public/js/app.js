console.log('Clientside JS')
const addressForm = document.querySelector('form')//target index.hbs <form> 
const search = document.querySelector('input') //Target Form input  index.hbs <input placeholder="Location, City, or ZIP">
const messageOne = document.querySelector('#inputLocation')//target 'id'  index.hbs <p id="inputLocation"> </p>
const messageTwo = document.querySelector('#inputForecast')//target 'id'  index.hbs <p id="inputForecast"> </p>
const messageThree = document.querySelector('#inputAlerts')


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

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast    
            messageThree.textContent = data.forecastDarkSky         
        }
        
        })
    })
   }
})
