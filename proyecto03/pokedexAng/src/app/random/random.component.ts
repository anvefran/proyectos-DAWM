import { Component } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos.service';
import { AllPokes, NameAndUrl} from 'src/app/interfaz/getPokemons';
import { PokemonI, Abilities, Stats, Types} from 'src/app/interfaz/pokemon-i';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent {
  name!: string;
  id!: number;
  type!: string;
  constructor(private recursosService: RecursosService) {
    let allPoks = JSON.parse(localStorage.getItem("allPokemons")!);
    if(allPoks) {
      let response = allPoks as AllPokes;
      let pokemons = response.results as Array<NameAndUrl>;
      let index = Math.floor(Math.random() * pokemons.length);
      this.name = pokemons[index].name;
      this.id = index+1;
    }
  }
  ngOnInit(){
    this.recursosService.getPokemonInfo(this.name).subscribe(respuesta => {
      let pokemon = respuesta as PokemonI;
      this.type = pokemon.types[0].type.name
    });
  }
}
