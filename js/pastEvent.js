let indexPlace = document.getElementById("cards-section2")
let search = document.getElementById("search")
let check = document.getElementById("check")
const past = data.events.filter( equis => equis.date <= data.currentDate )

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
renderTemplate(creatingCards (past), indexPlace);

//--------------Hasta acá funciona, a cruzar los dedos----------

// Función para filtrar categorias

const sinRepetir = []
const categorias = past.map(events => events.category)

categorias.forEach(categorias => {
    if (!sinRepetir.includes(categorias)){
        sinRepetir.push(categorias)}
    })
    
// Creación de los botones checkbox
    
function generarCheckbox (categorias){
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
    check.innerHTML = generarCheckbox(sinRepetir)
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
    check.addEventListener('change', filtroCruzado)
    
// Función para el filtro del search

search.addEventListener( 'input', filtroCruzado)

function searchFood(inputFind, categoriesList){
    const filterFood = categoriesList.filter(food => {
        return food.name.toLowerCase().startsWith(inputFind.value.toLowerCase())
    });
    return filterFood
}

// Función del filtro cruzado

function filtroCruzado(evento){
  let checkbuttons = document.querySelectorAll(".form-check-input")
    const filterPerFind = searchFood (search, past)
    const filterPerCheack = checkFilter (checkbuttons, filterPerFind)
    if(filterPerCheack.length === 0) {
        let alert = `<h3 class="alert">THERE IS NO COINCIDENCES WITH YOUR SEARCH</h3>`
        renderTemplate(alert, indexPlace)
    }
    else {
        renderTemplate(creatingCards(filterPerCheack), indexPlace)
    }
}

//Función del rendertemplate

function renderTemplate(template, ubicacion){
    ubicacion.innerHTML = template
}

filtroCruzado()