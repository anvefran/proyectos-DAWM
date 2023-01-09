import { Component } from '@angular/core';
import { RecursosService } from 'src/app/servicios/recursos.service';
import { AllPokes, NameAndUrl} from 'src/app/interfaz/getPokemons';
import { ActivatedRoute } from '@angular/router';
import { TypeI, Damage } from 'src/app/interfaz/type-i';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent{
  type!: string;
  pokemons: any[]=[];
  ids: number[] = [];
  damage!: Damage;
  types: string[] = ["all","normal", "fighting","flying","poison","ground","rock","bug",
  "ghost","steel","fire","water","grass","electric","psychic","ice","dragon","dark","fairy"];

  constructor(private router: Router,private route: ActivatedRoute, private recursosService: RecursosService) {}
  getPokemons(tipo: string){
    this.pokemons = [];
    this.type = tipo;
    let url = `/types/${tipo}`;
    if(tipo == "all"){
      let allPoks = JSON.parse(localStorage.getItem("allPokemons")!);
      if(allPoks) {
        let response = allPoks as AllPokes;
        this.pokemons = response.results as Array<NameAndUrl>;
      }
    } else {
      this.recursosService.getPokemonsbyType(tipo).subscribe(respuesta => {
        let res = respuesta as TypeI;
        for (let pokemon of res.pokemon){
          var splitted = pokemon.pokemon.url.split("/");
          var num = Number(splitted[6]);
          if (num <=905){
            var map = {
              name: pokemon.pokemon.name,
              id: num
            };
            this.pokemons.push(map);
          }
        }
        this.damage =  res.damage_relations;
      });
    }
  }
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.type = params['type']; 
    });
    this.getPokemons(this.type);
  }
}
