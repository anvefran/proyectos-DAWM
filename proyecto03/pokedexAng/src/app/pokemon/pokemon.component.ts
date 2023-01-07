import { Component } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos.service';
import { PokemonI, Abilities, Stats, Types} from 'src/app/interfaz/pokemon-i';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent {
  pokemon! : PokemonI; //= {} as PokemonI;
  public chart: any;
  constructor(private route: ActivatedRoute, private recursosService: RecursosService) {
  }
  ngOnInit(){
    let nombre = "";
    this.route.params.subscribe(params => {
      nombre = params['name']; 
    });
    this.recursosService.getPokemonInfo(nombre).subscribe(respuesta => {
      this.pokemon = respuesta as PokemonI;
      let arrNum = []
    let arrNom = []
    for(let i of this.pokemon.stats){
      arrNum.push(i.base_stat)
      arrNom.push(i.stat.name)
    }
    this.chart = new Chart("MyChart", {
      type: 'radar', //this denotes tha type of chart

      data: {
        labels: arrNom,
        datasets: [{
          label: "Statistics",
          data: arrNum,
          fill: true,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgb(255, 99, 132)',
        }]
      },
    });
    });
  }
}
