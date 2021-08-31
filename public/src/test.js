{   
    /** Testing: Building a Data Table
     * populate Data table with data
     * 
     * @param {HTMLDivElement} root 
     */

    
   async function updateTable(root){ //make updateTable async, and send root
        //console.log('test update table button')
  
       root.querySelector(".table-refresh__button").classList.add("table-refresh__button--refreshing")  //Link refresh button to refresh animation class

                                            // reference .table css class
       const table = root.querySelector(".table-refresh__table") //Link table to refesh button
       const response = await fetch(root.dataset.url) // Fetching response from '/data'
       const data = await response.json()
       console.log(data)

       //Clear table
       table.querySelector("thead tr").innerHTML= "";
       table.querySelector("tbody").innerHTML = "";

       //populate headers
       for (const header of data.headers){
        table.querySelector("thead tr").insertAdjacentHTML("beforeend", `<th> ${header}</th>`)
       }
       for (const row of data.rows){
        table.querySelector("tbody").insertAdjacentHTML("beforeend", 
        `<tr> 
        ${row.map(col => `<td>${ col }</td>`).join("")}
        
        </tr>`);
       }

       //update "last updated" text
       root.querySelector(".table-refresh__label").textContent = `Last Updated: ${new Date(data.lastUpdated).toLocaleString()}`
    }

   
    for (const root of document.querySelectorAll(".table-refresh[data-url]")){  //select the div class that our table is located in
        
        //console.log(root)

        //recreate table and option div
        const table =document.createElement("table")
        const options =document.createElement("div")

        //add the elements
        table.classList.add("table-refresh__table")
        options.classList.add("table-refresh__options")

        //create table loading text
        table.innerHTML = `
         <thead>
                <tr></tr>
            </thead>
            <tbody>
                <tr>
                <td>Testing..</td>
                </tr>
        </tbody>
        
        `;

        //create options
        options.innerHTML = `
        <span class= "table-refresh__label">Last update: never </span>
        <button type="button" class="table-refresh__button">
                 <i class="material-icons">refresh</i>
             </button>
        `

        //append to table-refresh[data-url]
        root.append(table,options)

        //update table button listener
        options.querySelector(".table-refresh__button").addEventListener("click", ()=>{
            updateTable(root)
        })


        //initiate the update table function
       // updateTable(root)
    }
}