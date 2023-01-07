import { Component } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos.service';
import { PokemonI, Abilities, Stats, Types} from 'src/app/interfaz/pokemon-i';
import { NameAndUrl} from 'src/app/interfaz/getPokemons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {
  pokemon! : PokemonI;

  constructor(private route: ActivatedRoute, private recursosService: RecursosService) {//private recursosService: RecursosService,
    this.route.params.subscribe(params => {
      let nombre = params['name']; 
      recursosService.getPokemonInfo(nombre).subscribe(respuesta => {
        this.pokemon = respuesta as PokemonI;
      });
      //this.pokemon = {} as PokemonI;
      //this.pokemon["name"] = "hola";
      //console.log(this.pokemon.name);

    });
  }
}
