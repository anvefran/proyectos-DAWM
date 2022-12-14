window.addEventListener('DOMContentLoaded', (event) => {
    showAll();
    cargarBotones();
    //cargarDatos();
    //mostrarInfo();
});

let showAll = async () => {
  let url = 'https://pokeapi.co/api/v2/pokemon-species?limit=905'
  await fetch(url)
      .then(response => response.json())
      .then(data => {
          let pokemon = data["results"] 
          let select = document.getElementsByClassName('imagenes')[0]   
          select.innerHTML = ""
          let count = 1 
          pokemon.forEach(function (element) {
              let nombre = element.name
              let fotopok = document.createElement("img")
              fotopok.addEventListener("click", mostrarInfo);
              fotopok.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`)
              fotopok.setAttribute("alt", `${nombre}`)
              fotopok.setAttribute("class", `imagen img-thumbnail ${nombre}`)
              fotopok.setAttribute("data-toggle","tooltip")
              fotopok.setAttribute("data-placement","bottom")
              fotopok.setAttribute("title",`${nombre}`)
              fotopok.setAttribute("role", "button")
              select.appendChild(fotopok)
              count = count + 1
            });
      })
      .catch(console.error);
}

let reset = document.getElementById("reset")
reset.addEventListener("click", showAll);

cargarBotones = () =>{
  let select = document.getElementsByClassName('pok')[0]  
  let div = document.createElement("div")
  div.setAttribute("class", "botones text-center")
  let url = "https://pokeapi.co/api/v2/type/"
  fetch(url)
      .then(response => response.json())
      .then(data => {
          let pokemon = data["results"] 
          pokemon.forEach(function (element) {
              let tipo = element.name
              let boton = document.createElement("button")
              boton.setAttribute("class", `m-1 btn ${tipo}`)
              boton.setAttribute("type", "button")
              boton.textContent = tipo
              boton.addEventListener("click", filtrar);
              div.appendChild(boton)
            });
      })
      .catch(console.error);
  select.prepend(div)
}


async function filtrar(event) {
  //if(document.getElementsByClassName("imagenes").innerHTML != ""){
    showAll()
  //}
  let tipo = event.target.textContent
  let url = `https://pokeapi.co/api/v2/type/${tipo}/`
  await fetch(url)
      .then(response => response.json())
      .then(data => {
          let pokemons = data["pokemon"]
          pokemons.forEach(function (element) {
            let name = element.pokemon.name
            let elemento = document.getElementsByClassName(`${name}`)[0]
            if (elemento != null || elemento != undefined){
              elemento.setAttribute("class", `imagen img-thumbnail ${name} t${tipo}`)
            }
          });
          $(`.imagenes :not(.t${tipo})`).remove();
      })
      .catch(console.error);
}

async function mostrarInfo(event) {
  let select = document.getElementsByClassName('pok')[0]
  select.innerHTML = ``
  let nombre = event.target.title;
  let url = `https://pokeapi.co/api/v2/pokemon/${nombre}/`
  await fetch(url)
    .then(response => response.json())
    .then( data => {
      let container = document.createElement("div")
      container.setAttribute("id", "container")
      container.setAttribute("class", "container justify-content-center text-center")
      let fotoUrl = data["sprites"]["front_default"]
      if (fotoUrl != null){
        let fotopok = document.createElement("img")
        fotopok.setAttribute("src", `${fotoUrl}`)
        fotopok.setAttribute("alt", `${nombre}`)
        fotopok.setAttribute("class", `animate__animated animate__shakeY text-center img-thumbnail`)
        container.appendChild(fotopok)
      }
      let baseExp = data["base_experience"]
      if (baseExp != null){
        container.innerHTML += `<span class= "p-2 font-weight-bold">Base experience:</span><span class= "p-2">${baseExp}</span>`
      }
      let height = data["height"]
      container.innerHTML += `<span class= "p-2 font-weight-bold">Height: </span><span class= "p-2">${height}</span>`
      let weight = data["weight"]
      container.innerHTML += `<span class= "p-2 font-weight-bold">Weight: </span><span class= "p-2">${weight}</span>`
      let abilities = data["abilities"]
      container.innerHTML += `<h6 class="mb-0 text-center p-2">Types</h6>`
      let tiposDiv = document.createElement("div")
      tiposDiv.setAttribute("id", "tipos")
      tiposDiv.setAttribute("class", "d-flex flex-row justify-content-around p-2")
      let tipos = data["types"]
      for(let tipo of tipos) {
        let plantilla = `
            <div class = "${tipo.type.name} p-2" >
                <span class ="p-2">${tipo.type.name}</span>
            </div>
        `
        tiposDiv.innerHTML += plantilla
      }
      container.appendChild(tiposDiv)
        
      container.innerHTML += `<h6 class="mb-0 text-center p-2">Abilities</h6>`
      let abilitiesDiv = document.createElement("div")
      abilitiesDiv.setAttribute("id", "abilities")
      abilitiesDiv.setAttribute("class", "d-flex flex-row justify-content-around")
      for(let ability of abilities){
        let plantilla = `
            <div id="ability" class = "p-2">
              <span class = "p-2">${ability.ability.name}</span>
            </div>
        `
        abilitiesDiv.innerHTML += plantilla
      }
      container.appendChild(abilitiesDiv)
      select.appendChild(container)

      //CHARTS
      let stats = data["stats"]
      let arrNum = []
      let arrNom = []
      for(let i of stats){
        arrNum.push(i["base_stat"])
        arrNom.push(i["stat"]["name"])
      }
      let canvas = document.createElement("canvas")
      select.appendChild(canvas)
      canvas.setAttribute("id", "radar-chart")
      canvas = new Chart(canvas, {
        type: "radar",
        data: {
          labels: arrNom,
          datasets: [{
            label: "Statistics",
            data: arrNum,
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
          }]
        },
      })
      
    })

    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${nombre}/`)
    .then(response => response.json())
    .then( data => {
      let base_hp = data["base_happiness"]
      let capture_rate = data["capture_rate"]
      console.log("basehp", base_hp)
      console.log("rate", capture_rate)
      let canvas2 = document.createElement("canvas")
      select.appendChild(canvas2)
      canvas2.setAttribute("id", "bar-chart")
      canvas2 = new Chart(canvas2, {
        type: "bar",
        data: {
          labels: ["Base experience", "Capture rate"],
          datasets: [{
            data: [base_hp, capture_rate],
            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 50, 200, 0.2)'],
            borderColor: ['rgb(255, 99, 132)', 'rgb(255, 99, 132)']
          }],
          borderWidth: 1
        },
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
        }
      })
    })

    let regresar = document.createElement("button")
    regresar.setAttribute("class", `m-1 btn regresar`)
    regresar.setAttribute("type", "button")
    regresar.textContent = "Back to All Pokemons"
    regresar.addEventListener("click", back);
    select.appendChild(regresar)
}

function back(event){
  let select = document.getElementsByClassName("pok")[0]
  select.innerHTML = ""
  let reset = document.createElement("button")
  reset.setAttribute("type", "reset")
  reset.setAttribute("class", "btn m-3")
  reset.setAttribute("id", "reset")
  reset.addEventListener("click", showAll)
  reset.textContent = "Reset Filter"
  select.appendChild(reset)
  let div = document.createElement("div")
  div.setAttribute("class","imagenes text-center")
  select.appendChild(div)
  showAll();
  cargarBotones();
}
