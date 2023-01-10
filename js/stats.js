let stat_1 = document.getElementById("tbody_1")
let stat_2 = document.getElementById("tbody_2")
let stat_3 = document.getElementById("tbody_3")

let lista;
const url = "https://mindhub-xj03.onrender.com/api/amazing";
fetch(url)
.then(response => response.json())
.then(datos => {
    lista = datos
    creatingPastTR (lista, stat_3)
    creatingUpcomingTR (lista, stat_2)
    mayorCapacity(lista.events)
    let filtro = creatingNewList(lista)
    imprimirMayorPorcentaje(filtro)
    imprimirMenorPorcentaje(filtro)
})
.catch(error => error.message)



// past rows

function creatingPastTR(losDatos, ubicacion){
    let pasEvents = losDatos.events.filter(evento => evento.date < losDatos.currentDate)
    let template2 = ""

    for (let past of pasEvents){
        template2 += 
    `<tr>
        <td>${past.category}</td>
        <td>$ ${multiplicacion(past.assistance, past.price)}</td>
        <td>${porcentaje(past.capacity, past.assistance)}%</td>
    </tr>`
    }


    ubicacion.innerHTML = template2
}

// upcoming rows

function creatingUpcomingTR(losDatos, ubicacion){

        let upcomingEvents = losDatos.events.filter(evento => evento.date > losDatos.currentDate)
        let template1 = ""
        for (let up of upcomingEvents){
            template1 += 
        `<tr>
            <td>${up.category}</td>
            <td>$ ${multiplicacion(up.estimate, up.price)}</td>
            <td>${porcentaje(up.capacity, up.estimate)}%</td>
        </tr>`
        }
    
        ubicacion.innerHTML = template1
}

// multiplicando

function multiplicacion(dato1, dato2){
    return (dato1 * dato2).toLocaleString()
}

// calculando el porcentaje

function porcentaje(dato1, dato2){
    return ( dato2 / (dato1/100) ).toFixed (3)
}

function mayorCapacity (eventos){
    let mayorCapacity = eventos.sort((a,b) => b.capacity - a.capacity)
    document.getElementById ("eventomayor").innerHTML = mayorCapacity[0].name
}

function creatingNewList(datos){
let nuevaLista = []

    for (let i = 0; i < datos.events.length; i++) {
        nuevaLista.push(datos.events[i]);
        
        nuevaLista[i].percentage = porcentaje(nuevaLista[i].capacity, (nuevaLista[i].assistance ?? nuevaLista[i].estimate));
    }
    console.log(nuevaLista)
    return nuevaLista.sort((a,b) => b.percentage - a.percentage)
}

function imprimirMayorPorcentaje(nuevoEvento){
    document.getElementById("mayorporcentaje").innerHTML = `${nuevoEvento[0].name} ${nuevoEvento[0].percentage}`
}

function imprimirMenorPorcentaje(nuevoEvento){
    document.getElementById("menorporcentaje").innerHTML = `${nuevoEvento[nuevoEvento.length-1].name} ${nuevoEvento[nuevoEvento.length-1].percentage}`
}