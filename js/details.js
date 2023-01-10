let cadenaParametroUrl = location.search
let parametros = new URLSearchParams(cadenaParametroUrl)
let idCard = parametros.get("idUrl")

let contenedor = document.getElementById("details-image")

let recorrido = data.events

let cardEncontrada = recorrido.find(recorrido => recorrido._id == idCard)

function pintarCard(recorrido){
    contenedor.innerHTML = ""
    let template = `
    <div class="row g-3 m-1 bg-info rounded align-items-center">
            <div class="col-md-4">
            <img src="${recorrido.image}" class="border img-fluid rounded" alt="${recorrido.name}">
            </div>
            <div class="col-md-8 card-text col-12">
            <div class="card-body card-foot">
                <h5 class="card-title"> ${recorrido.name}</h5>
                <p class="card-text">Date: ${recorrido.date}</p>
                <p class="card-text">Description: ${recorrido.description}</p>
                <p class="card-text">Category: ${recorrido.category}</p>
                <p class="card-text">Place: ${recorrido.place}</p>
                <p class="card-text">Capacity: ${recorrido.capacity}</p>
                <p class="card-text">Estimate: ${recorrido.estimate}</p>
                <p class="card-text">Price: ${recorrido.price}</p>
            </div>
            </div> `

    contenedor.innerHTML = template
}

pintarCard(cardEncontrada)