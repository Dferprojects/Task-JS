let where = document.getElementById("cards-section1")

function crearCards( lista, va ){
    let todasLasCards = ""
    for (let recorrido of lista){

                        todasLasCards+=`<div class="card" style= "width: 16rem;">
                        <img class="card-img-top" src="${recorrido.image}" alt="${recorrido.name}">
                <div class="card-body">
                  <h5 class="card-title text-center">${recorrido.name}</h5>
                  <p class="card-text text-center">${recorrido.description}</p>
                  <div class="d-flex justify-content-between align-items-baseline">  
                    <p>Price: ${recorrido.price}</p>
                    <a class="link-warning p-2 bg-success text-light text-decoration-none" href="./details.html">View more</a>
                  </div>
                </div>
              </div>`
        }

    va.innerHTML = todasLasCards;

}
crearCards (data.events, where)