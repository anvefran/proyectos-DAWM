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
            let select = document.getElementsByClassName('select')[0]          

            pokemon.forEach(function (element) {
                let option = document.createElement("option")
    
                option.innerHTML = element.name
                //option.setAttribute("value", element.getElementsByTagName("id")[0].innerHTML )
    
                select.appendChild(option)
    
              });
            
        })
        .catch(console.error);

}

let mostrarInfo = () => {
    let select = document.getElementsByClassName('select')[0]

    select.addEventListener("change", (event) => {
        let valor = event.target.value;
        let url = `https://pokeapi.co/api/v2/pokemon/${valor}/`

        fetch(url)
        .then(response => response.json())
        .then( data => {
          let tipos = data["types"]
          let baseExp = data["base_experience"]
          document.getElementById("info").innerHTML = `<div class="general"><span>Base experience:${baseExp}</span></div>`
          let height = data["height"]
          document.getElementById("info").innerHTML += `<div class="general"><span>Height: ${height}</span></div>`
          let weight = data["weight"]
          document.getElementById("info").innerHTML += `<div class="general"><span>Weight: ${weight}</span></div>`
          let abilities = data["abilities"]
          
          document.getElementById("info").innerHTML += `<div><h3>Types</h3></div>`
          for(let tipo of tipos) {
            let plantilla = `
              <div class="general">
                  <div class="text">
                      <span>${tipo.type.name}</span>
                  </div>
              </div>
            `
            document.getElementById("info").innerHTML += plantilla
          }
          document.getElementById("info").innerHTML += `<div><h3>Abilities</h3></div>`
          for(let ability of abilities){
            let plantilla = `
              <div class="general">
                  <div id="ability">
                      <span>${ability.ability.name}</span>
                  </div>
              </div>
            `
            document.getElementById("info").innerHTML += plantilla
          }
        })
  
    
      })
    
}

