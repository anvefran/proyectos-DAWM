import { Component } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos.service';
import { AllPokes, NameAndUrl} from 'src/app/interfaz/getPokemons';

@Component({
  selector: 'app-all-pokemons',
  templateUrl: './all-pokemons.component.html',
  styleUrls: ['./all-pokemons.component.css']
})
export class AllPokemonsComponent {
  pokemons: NameAndUrl[]=[];
  constructor(private recursosService: RecursosService) {}
  ngOnInit(){
   this.recursosService.getAllPokemons().subscribe(respuesta => {
      let allPokemons = localStorage.getItem("allPokemons");
      if(!allPokemons) {
        localStorage.setItem("allPokemons", JSON.stringify(respuesta));
      }
      let response = respuesta as AllPokes;
      this.pokemons = response.results as Array<NameAndUrl>
    })
  }
}
