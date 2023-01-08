import { Component } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos.service';
import { AllPokes, NameAndUrl} from 'src/app/interfaz/getPokemons';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent {
  name!: string;
  id!: number;
  constructor() {
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

  }
}
