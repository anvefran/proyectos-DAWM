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
      console.log(valor)
      let url = `https://pokeapi.co/api/v2/pokemon-species/${valor}/`
      console.log(url)

      fetch(url)
      .then(response => response.json())
      .then( data => {
        let frases = data["flavor_text_entries"]
        let frasesfiltradas = frases.filter(frase => frase["language"]["name"] == "en" );

        console.log(frasesfiltradas)
        document.getElementById("infoPokemon").innerHTML = ''

        for( let frase of frasesfiltradas) {
            let info = frase.flavor_text.replace(/\f/g, " ");
            let plantilla = `
              <div class="flavorText">
                  <div class="text">
                      <span>Version: ${frase.version["name"]}</span>
                      <span>${info}</span>
                  </div>
              </div>
            `
            document.getElementById("infoPokemon").innerHTML += plantilla
  
          }

      })

      
  
    })
}

