import { Component } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos.service';
import { PokemonI, Abilities, Stats, Types} from 'src/app/interfaz/pokemon-i';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {
  pokemon! : PokemonI; //= {} as PokemonI;

  constructor(private route: ActivatedRoute, private recursosService: RecursosService) {
  }
  ngOnInit(){
    let nombre = "";
    this.route.params.subscribe(params => {
      nombre = params['name']; 
    });
    this.recursosService.getPokemonInfo(nombre).subscribe(respuesta => {
      this.pokemon = respuesta as PokemonI;
    });
  }
}
