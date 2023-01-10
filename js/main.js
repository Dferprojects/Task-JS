let indexPlace = document.getElementById("cards-section1")
let search = document.getElementById("search")
let check = document.getElementById("check")

let globalData;
const url = "https://mindhub-xj03.onrender.com/api/amazing"

fetch(url)
.then(data => data.json())
.then(data =>{ 
    globalData = data
    renderTemplate (creatingCards(globalData.events), indexPlace)
    check.innerHTML = creatingCheckbox(globalData.events)
    check.addEventListener('change', crossFilter)
    search.addEventListener( 'input', crossFilter)
})
.catch(error => console.log(error))


function creatingCards( lista, parameter2 ){
    let allCards = ""
    for (let recorrido of lista){

                        let cards = `<div class="card" style= "width: 16rem;">
                        <img class="card-img-top" src="${recorrido.image}" alt="${recorrido.name}">
                <div class="card-body">
                  <h5 class="card-title text-center">${recorrido.name}</h5>
                  <p class="card-text text-center">${recorrido.description}</p>
                  <div class="d-flex justify-content-between align-items-baseline">  
                    <p>Price: ${recorrido.price}</p>
                    <a class="link-warning p-2 bg-success text-light text-decoration-none" href="./details.html?idUrl=${recorrido._id}">View more</a>
                  </div>
                </div>
              </div>`
              allCards += cards;
        }

    return allCards;

}

//--------------Hasta acá funciona, a cruzar los dedos----------

// Función para filtrar categorias

/* const sinRepetir = []
const categorias = data.events.map(events => events.category)

categorias.forEach(categorias => {
    if (!sinRepetir.includes(categorias)){
        sinRepetir.push(categorias)}
    })
     */
// Creación de los botones checkbox
    
function creatingCheckbox (infoData){
    const categorias = new Set(infoData.map(eventInfo => eventInfo.category))
        let template = ""
        categorias.forEach(categoria =>{
            template += `<div class="m-2 form-check d-flex">   
            <label class="form-check-label">${categoria}
            <input class="form-check-input" type="checkbox" value="${categoria}">
            </label>
            </div>`
        })
        return template
    }
   
    // Inners para pasar checks a documento HTML
    
// Función chequeado de filtros
    
    function checkFilter (touchs, categoriesList){
        let values = [];
        for (let touch of touchs){
            if (touch.checked)
            values.push(touch.value.toLowerCase())
        }
        let filters = categoriesList.filter(food => values.includes(food.category.toLowerCase()))
        if (values.length === 0){
            return categoriesList
        }
        else{
            return filters
        }
    }
    
    
// Función para el filtro del search



function searchFilter(inputFind, categoriesList){
    const filterFood = categoriesList.filter(food => {
        return food.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterFood
}

// Función del filtro cruzado

function crossFilter(evento){
  let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFilter (search, globalData.events)
    const filterPerCheck = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheck.length === 0) {
        let alert = `<div style="background-color:red"><h3 style="color:white" class="alert">NOT FOUND</h3></div>`
        renderTemplate(alert, indexPlace)
    }
    else {
        renderTemplate(creatingCards(filterPerCheck), indexPlace)
    }
}

//Función del rendertemplate

function renderTemplate(template, ubicacion){
    ubicacion.innerHTML = template
}

//crossFilter()