window.addEventListener('DOMContentLoaded', (event) => {
    cargarDatos();
    mostrarInfo();
});

let cargarDatos = () => {
    console.log('DOM cargado y analizado');
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=809'
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
