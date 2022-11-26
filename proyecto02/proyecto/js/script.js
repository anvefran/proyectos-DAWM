window.addEventListener('DOMContentLoaded', (event) => {
    showAll();
    cargarBotones();
    //cargarDatos();
    //mostrarInfo();
});

let showAll = () => {
  let url = 'https://pokeapi.co/api/v2/pokemon-species?limit=905'
  fetch(url)
      .then(response => response.json())
      .then(data => {
          let pokemon = data["results"]
          let select = document.getElementsByClassName('imagenes')[0]   
          select.innerHTML = ""
          let count = 1 
          pokemon.forEach(function (element) {
              let nombre = element.name
              let fotopok = document.createElement("img")
              fotopok.setAttribute("src", `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`)
              fotopok.setAttribute("alt", `${nombre}`)
              fotopok.setAttribute("class", `img-thumbnail ${nombre}`)
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
  let url = "https://pokeapi.co/api/v2/type/"
  fetch(url)
      .then(response => response.json())
      .then(data => {
          let pokemon = data["results"]
          let select = document.getElementsByClassName('botones')[0]   
          pokemon.forEach(function (element) {
              let tipo = element.name
              let boton = document.createElement("button")
              boton.setAttribute("class", `m-1 btn ${tipo}`)
              boton.setAttribute("type", "button")
              boton.textContent = tipo
              boton.addEventListener("click", filtrar);
              select.appendChild(boton)
            });
      })
      .catch(console.error);

}


function filtrar(event) {
  if(document.getElementsByClassName("img-thumbnail").length != 905){
    showAll()
  }
  let tipo = event.target.textContent
  let url = `https://pokeapi.co/api/v2/type/${tipo}/`
  fetch(url)
      .then(response => response.json())
      .then(data => {
          let pokemons = data["pokemon"]
          console.log(pokemons)
          pokemons.forEach(function (element) {
            let name = element.pokemon.name
            let elemento = document.getElementsByClassName(`${name}`)[0]
            if (elemento != null || elemento != undefined){
              elemento.setAttribute("class", `img-thumbnail ${name} t${tipo}`)
            }
          });
          $(`.imagenes :not(.t${tipo})`).remove();
      })
      .catch(console.error);
}


let cargarDatos = () => {
  console.log('DOM cargado y analizado');
  let url = 'https://pokeapi.co/api/v2/pokemon-species?limit=905'
  fetch(url)
      .then(response => response.json())
      .then(data => {
          let pokemon = data["results"]
          let select = document.getElementsByClassName('form-select')[0]          

          pokemon.forEach(function (element) {
              let option = document.createElement("option")
              option.innerHTML = element.name
              select.appendChild(option)
            });
          
      })
      .catch(console.error);

}

let mostrarInfo = () => {
    let select = document.getElementsByClassName('form-select')[0]

    select.addEventListener("change", (event) => {
        let valor = event.target.value;
        let url = `https://pokeapi.co/api/v2/pokemon/${valor}/`
        fetch(url)
        .then(response => response.json())
        .then( data => {
          let tipos = data["types"]
          let baseExp = data["base_experience"]
          document.getElementById("infoPokemon").innerHTML = ``
          let info = document.createElement("div")
          info.setAttribute("id", "info")
          info.setAttribute("class", "card-body")
          document.getElementById("infoPokemon").appendChild(info)
          if (baseExp != null){
            document.getElementById("info").innerHTML = `<div class="general"><span>Base experience: ${baseExp}</span></div>`
          }
          
          let height = data["height"]
          document.getElementById("info").innerHTML += `<div class="general"><span>Height: ${height}</span></div>`
          let weight = data["weight"]
          document.getElementById("info").innerHTML += `<div class="general"><span>Weight: ${weight}</span></div>`
          let abilities = data["abilities"]
          
          document.getElementById("info").innerHTML += `<div class="general"><h6 class="mb-0 text-center">Types</h6></div>`
          let tiposDiv = document.createElement("div")
          tiposDiv.setAttribute("id", "tipos")
          tiposDiv.setAttribute("class", "general")
          document.getElementById("info").appendChild(tiposDiv)
          let fotoUrl = data["sprites"]["front_default"]

          for(let tipo of tipos) {
            let plantilla = `
                <div class = "tipo ${tipo.type.name}">
                    <span>${tipo.type.name}</span>
                </div>

            `
            document.getElementById("tipos").innerHTML += plantilla
          }
          if (fotoUrl != null){
            let fotopok = document.createElement("img")
            fotopok.setAttribute("src", `${fotoUrl}`)
            fotopok.setAttribute("alt", `${valor}`)
            fotopok.setAttribute("class", `animate__animated animate__backInRight card-img-top`)
            document.getElementById("infoPokemon").appendChild(fotopok)
          }
          
          document.getElementById("info").innerHTML += `<div class="general"><h6 class="mb-0 text-center">Abilities</h6></div>`
          let abilitiesDiv = document.createElement("div")
          abilitiesDiv.setAttribute("id", "abilities")
          abilitiesDiv.setAttribute("class", "general")
          document.getElementById("info").appendChild(abilitiesDiv)

          for(let ability of abilities){
            let plantilla = `
                <div id="ability">
                  <span>${ability.ability.name}</span>
                </div>
            `
            document.getElementById("abilities").innerHTML += plantilla
          }
        })
  
    
      })
    
}
