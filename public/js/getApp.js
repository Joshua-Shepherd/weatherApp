console.log('Clientside JS: Get Forcast History')
const addressForm = document.querySelector('form')//target index.hbs <form> 
const search = document.querySelector('input') //Target Form input  index.hbs <input placeholder="Location, City, or ZIP">
const locationCol = document.querySelector('#idLocation')//target 'id'  index.hbs <p id="inputLocation"> </p>
const degreeCol = document.querySelector('#idDegree')//target 'id'  index.hbs <p id="inputForecast"> </p>
const forcastCol = document.querySelector('#idForcast')
const errorMessage = document.querySelector('#idError')
const forcastTable = document.querySelector('table')
const forcastBody = document.querySelector('tbody')
// const forcastHeader = document.querySelector('th')
addressForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const cityName = search.value  // console.log(location) = austin
    if(!cityName){
        locationCol.textContent= 'No Location Entered!'
        degreeCol.textContent = ''
    }else{
        fetch(`api/weatherHistoryApi?cityName=${cityName}`).then((response) => {
            response.json().then((data) => {
                if(data.error){
                console.log(error)
                // errorMessage.textContent = response.error
            }else{  
                buildTable(data)
                console.log(data)
             }     
            }) 
        })
        addressForm.addEventListener('click', (e) =>{
            e.preventDefault()
            forcastBody.innerHTML =""
        })
  }
})
function buildTable(locationData){
    locationData.forEach(city =>{
        let row =  `<tr> 
                        <td>${city.location}</td>
                        <td>${city.degree}</td>
                        <td>${city.forcast}</td>
                        <td>${city.createdAt}</td>
                    </tr>`
                    forcastBody.innerHTML += row
    })  
}

