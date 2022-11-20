window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
    mostrarInfo();
});

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

          document.getElementById("info").innerHTML = `<div class="general"><span>Base experience: ${baseExp}</span></div>`
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
                <div class = "tipo" id="${tipo.type.name}">
                    <span>${tipo.type.name}</span>
                </div>

            `
            document.getElementById("tipos").innerHTML += plantilla
          }
          let fotopok = document.createElement("img")
          fotopok.setAttribute("src", `${fotoUrl}`)
          fotopok.setAttribute("alt", `${valor}`)
          fotopok.setAttribute("class", `card-img-top`)
          document.getElementById("infoPokemon").appendChild(fotopok)
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